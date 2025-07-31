document.querySelectorAll('.code-block code').forEach(codeEl => {
    codeEl.querySelectorAll('.copy-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const clone = codeEl.cloneNode(true);
            clone.querySelectorAll('.copy-icon,svg').forEach(el => el.remove());
            const text = clone.textContent.trim();
            
            navigator.clipboard.writeText(text)
                .then(() => {
                    // Создаем простое всплывающее окно
                    const rect = icon.getBoundingClientRect();
                    const tooltip = document.createElement('div');
                    tooltip.textContent = '✔ Скопировано!';
                    tooltip.style.cssText = `
                        position: fixed;
                        top: ${rect.top - 40}px;
                        left: ${rect.left + rect.width/2}px;
                        transform: translateX(-50%);
                        background: #333;
                        color: white;
                        padding: 6px 10px;
                        border-radius: 4px;
                        font-size: 12px;
                        z-index: 1000;
                        animation: fadeInOut 2s ease-in-out forwards;
                    `;
                    
                    // Добавляем анимацию
                    if (!document.querySelector('#tooltip-animation')) {
                        const style = document.createElement('style');
                        style.id = 'tooltip-animation';
                        style.textContent = `
                            @keyframes fadeInOut {
                                0% { opacity: 0; transform: translateX(-50%) translateY(5px); }
                                20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                                100% { opacity: 0; transform: translateX(-50%) translateY(-5px); }
                            }
                        `;
                        document.head.appendChild(style);
                    }
                    
                    document.body.appendChild(tooltip);
                    
                    // Удаляем всплывающее окно
                    setTimeout(() => {
                        if (tooltip.parentNode) {
                            tooltip.parentNode.removeChild(tooltip);
                        }
                    }, 2000);
                })
                .catch(err => {
                    alert("Ошибка копирования: " + err);
                });
        });
    });
});