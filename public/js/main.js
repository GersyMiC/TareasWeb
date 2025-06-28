// public/js/main.js

// Opcional: confirmación genérica para todos los botones de eliminación
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[action^="/delete"] button')
    .forEach(btn => {
      btn.addEventListener('click', e => {
        if (!confirm('¿Estás seguro de eliminar esta tarea?')) {
          e.preventDefault();
        }
      });
    });
});
