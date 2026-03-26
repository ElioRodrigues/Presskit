document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    console.log(`Navegando para: ${link.getAttribute('href')}`);
  });
});