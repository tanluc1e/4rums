export const language = () => {
    const langs = ['vi', 'en']
    const langFromLS = langs.find(i => i === localStorage.getItem('lang'))
    const langFromNL = langs.find(i => i === window.navigator.language)

    return langFromLS ? langFromLS : langFromNL ? langFromNL : 'en'
}