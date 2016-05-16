const createFragmentShader = require('./shader/fragment.c');
const createVertexShader = require('./shader/vertex.c');

function createWebGLContext(canvas) {
  try {
    return canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  } catch (error) {
    throw error;
  }
}

function addShader(gl, prog, shader, source) {
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  gl.attachShader(prog, shader);
}

function attributeSetFloats(gl, prog, attributeName, rsize, arr) {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);
  const attr = gl.getAttribLocation(prog, attributeName);
  gl.enableVertexAttribArray(attr);
  gl.vertexAttribPointer(attr, rsize, gl.FLOAT, false, 0, 0);
}

function render(canvas) {
  const gl = createWebGLContext(canvas);

  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const prog = gl.createProgram();

    addShader(gl, prog, gl.createShader(gl.VERTEX_SHADER), createVertexShader());
    addShader(gl, prog, gl.createShader(gl.FRAGMENT_SHADER), createFragmentShader());

    gl.linkProgram(prog);
    gl.useProgram(prog);

    attributeSetFloats(gl, prog, 'pos', 3, [
      -1, 0, 0,
      0, 1, 0,
      0, -1, 0,
      1, 0, 0
    ]);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

requestAnimationFrame(() => {
  const canvas = document.getElementById('vanilla');
  render(canvas);
});
