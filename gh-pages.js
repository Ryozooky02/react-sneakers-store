const execa = require('execa');

const deploy = async () => {
  try {
    // Сборка React-приложения
    await execa('npm', ['run', 'build']);

    // Копирование сборки в папку docs
    await execa('cp', ['-r', 'build', 'docs']);

    // Пуш сборки в ветку gh-pages
    await execa('git', ['add', 'docs']);
    await execa('git', ['commit', '-m', 'Deploy']);
    await execa('git', ['push', 'origin', 'HEAD:gh-pages']);

    console.log('Деплой успешно завершён.');
  } catch (error) {
    console.error('Ошибка при деплое:', error);
  }
};

deploy();
