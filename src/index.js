function render(canvas) {
  const gl = createWebGLContext(canvas);

  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
}

function createWebGLContext(canvas) {
  try {
    return canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  }
  catch(error) {
    throw error;
  }
}

requestAnimationFrame(() => {
  const canvas = document.getElementById("vanilla");
  render(canvas);
});
