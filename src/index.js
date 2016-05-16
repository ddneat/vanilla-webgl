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

function attributeSetFloats(gl, program, attributeName, itemSize, coordiantes) {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordiantes), gl.STATIC_DRAW);
  const attr = gl.getAttribLocation(program, attributeName);
  gl.enableVertexAttribArray(attr);
  gl.vertexAttribPointer(attr, itemSize, gl.FLOAT, false, 0, 0);
}

function render(canvas) {
  const gl = createWebGLContext(canvas);

  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const program = gl.createProgram();

    addShader(gl, program, gl.createShader(gl.VERTEX_SHADER), createVertexShader());
    addShader(gl, program, gl.createShader(gl.FRAGMENT_SHADER), createFragmentShader());

    gl.linkProgram(program);
    gl.useProgram(program);

    attributeSetFloats(gl, program, 'pos', 3, [
      -1, -1, 0,
      0, 1, 0,
      1, -1, 0
    ]);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
  }
}

requestAnimationFrame(() => {
  const canvas = document.getElementById('vanilla');
  render(canvas);
});
