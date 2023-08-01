if (
    localStorage.getItem('tool-theme-mode') === "dark" ||
    (!localStorage.getItem('tool-theme-mode') &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
    document.querySelector('html').classList.add('dark');
    document.querySelector('html').classList.remove('light');
} else {
    document.querySelector('html').classList.add('light');
    document.querySelector('html').classList.remove('dark');
}

