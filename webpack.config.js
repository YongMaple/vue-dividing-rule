var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var pkg = require('./package.json');
var banner = `${pkg.name} v${pkg.version}\n${pkg.description}\n@author ${pkg.author}`;
module.exports = {
    entry: {
        'vue-dividing-rule': path.join(__dirname, 'src/index.vue')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        library: 'VueDividingRule',
        libraryTarget: 'umd',
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.less$/, loader: "css?sourceMap!postcss!less?sourceMap"}
        ]
    },
    postcss: [autoprefixer({browsers: ['last 2 versions', 'Android 2.3']})],
    babel: {
        "presets": ["es2015"]
    },
    plugins: []
};

if (process.env.NODE_ENV === 'dev') {
    module.exports.devtool = '#eval-source-map';
} else {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
    module.exports.plugins.push(new webpack.BannerPlugin(banner));
}
