// let vsSource =
//     [
//         'attribute vec3 a_position;',
//         'uniform mat4 u_mvMatrix;',
//         'uniform mat4 u_pMatrix;',
//         'void main() {',
//         'gl_Position = u_pMatrix * u_mvMatrix * vec4(a_position, 1.0);',
//         // размер искры
//         'gl_PointSize = 32.0;',
//         '}',
//     ].join('\n');

// let fsSource =
//     [
//         'precision mediump float;',
//         'uniform sampler2D u_texture;',
//         'void main() {',
//         'gl_FragColor = texture2D(u_texture, gl_PointCoord);',
//         '}'
//     ].join('\n');