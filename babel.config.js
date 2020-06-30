module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        require('@babel/plugin-proposal-decorators').default,
        { legacy: true }
    ],
    // transformer: {
    //     babelTransformerPath: require.resolve('react-native-typescript-transformer')
    // }
};