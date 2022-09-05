import resolve from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules (mandatory)
import { terser } from "rollup-plugin-terser"; // code minification (optional)

export default [{
	input: 'src/mod_ship.js',
	output: [
		{
			format: 'umd',
			name: 'MOD_SHIP',
			file: 'build/mod_ship.js'
		}
	],
	plugins: [ resolve(), terser() ]
},
{
	input: 'src/drone.js',
	output: [
		{
			format: 'umd',
			name: 'DRONE',
			file: 'build/drone.js'
		}
	],
	plugins: [ resolve(), terser() ]
},
];
