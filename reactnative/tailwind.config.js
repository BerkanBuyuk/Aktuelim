/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        textColor: '#fff',
        dark_text_color: '#000',
        inActiveTextColor: '#000',
        baseColor: '#26af61',
        dark_base_color: '#353839',
        categories_color: '#bde7cf',
        dark_categories_color: '#b0b0b0',
        light_bg_color: '#f5f5f5',
        dark_bg_color: '#95999b',
        light_textInput_color: '#fff',
        dark_textInput_color: '#f0f0f0',
        light_shopList_item: '#d5e0da',
        dark_shopList_item: '#f0f0f0',
      },
      textColor: {
        textColor: '#fff',
        dark_text_color: '#000',
        inActiveTextColor: '#000',
        baseColor: '#26af61',
        dark_base_color: '#353839',
        categories_color: '#bde7cf',
        dark_categories_color: '#b0b0b0',
        light_bg_color: '#f5f5f5',
        dark_bg_color: '#95999b',
        light_textInput_color: '#fff',
        dark_textInput_color: '#f0f0f0',
        light_shopList_item: '#d5e0da',
        dark_shopList_item: '#f0f0f0',
        addBtn: '#52BBFF',
      },
      borderColor: {
        textColor: '#fff',
        dark_text_color: '#000',
      },
      fontFamily: {
        myFont: 'REM-Regular',
      },
    },
  },
  plugins: [],
};
