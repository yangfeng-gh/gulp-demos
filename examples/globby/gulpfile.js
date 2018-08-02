const globby = require('globby');

(async () => {
	const paths = await globby(['*', '!cake']);

	console.log(paths);
	//=> ['unicorn', 'rainbow']
})();