const createFragmentShader = require('./shader/fragment.c');
const createVertexShader = require('./shader/vertex.c');

function createWebGLContext(canvas) {
  try {
    return canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  } catch (error) {
    throw error;
  }
}

function addShader(gl, program, shader, source) {
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }
  gl.attachShader(program, shader);
}

function attributeSetFloats(gl, program, attributeName, itemSize, items) {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(items), gl.STATIC_DRAW);
  const attributeLocation = gl.getAttribLocation(program, attributeName);
  gl.enableVertexAttribArray(attributeLocation);
  gl.vertexAttribPointer(attributeLocation, itemSize, gl.FLOAT, false, 0, 0);
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

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(`Unable to initialize the shader program:${gl.getProgramInfoLog(program)}`);
    }

    gl.useProgram(program);

    attributeSetFloats(gl, program, 'vertexPosition', 3, [
      0.5, 0.5, 0.0,
      -0.5, 0.5, 0.0,
      0.5, -0.5, 0.0,
      -0.5, -0.5, 0.0
    ]);

    attributeSetFloats(gl, program, 'vertexColor', 4, [
      1.0, 1.0, 1.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0
    ]);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

requestAnimationFrame(() => {
  const canvas = document.getElementById('vanilla');
  render(canvas);
});
