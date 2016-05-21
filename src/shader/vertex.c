attribute vec3 vertexPosition;
attribute vec4 vertexColor;

varying vec4 vColor;

void main() {
  gl_Position = vec4(vertexPosition, 1.0);
  vColor = vertexColor;
}
