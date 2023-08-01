const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")

module.exports = {
    darkMode: 'class',
    plugins: [
        iconsPlugin({
            // Select the icon collections you want to use
            collections: getIconCollections(["heroicons", "simple-icons"]),
        }),
    ],
}