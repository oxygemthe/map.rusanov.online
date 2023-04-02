import Swal from "sweetalert2";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import {Ball, canvas} from "./bounce";

let cropper = null;

// document.body.querySelector('#image').addEventListener('change', () => {
//     const formImage = document.body.querySelector('#image');
//     const reader = new FileReader();
//     const image = document.getElementById('img');
//     if (cropper != null) {
//         cropper.destroy();
//     }
//     reader.onload = () => {
//         image.src = reader.result;
//         cropper = new Cropper(image, {
//             aspectRatio: 8 / 8,
//             cropBoxResizable: false,
//             dragMode: "move",
//             viewMode: 1,
//         });
//         cropper.replace(image.src);
//     };
//     reader.readAsDataURL(formImage.files[0]);
// });

document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.body.querySelector('#name');
    const text = document.body.querySelector('#review');
    const image = document.body.querySelector('#image');

    if (!(name.value != null && name.value.length >= 2)) {
        name.classList.add('error');
        return false;
    }
    name.classList.remove('error');
    if (!(text.value !== '')) {
        text.classList.add('error');
        return false;
    }
    text.classList.remove('error');
    if (!(image.files.length > 0)) {
        image.closest('.form-input-file').classList.add('error');
        return false;
    }
    image.closest('.form-input-file').classList.remove('error');

    // cropper.getCroppedCanvas().toBlob((blob) => {
    //     const body = new FormData();
    //     body.append('name', name.value);
    //     body.append('text', text.value);
    //     body.append('avatar', blob == null ? image.files[0] : blob);
    //
    //     document.querySelector('form .btn-add').disabled = true;
    //     fetch(e.target.action, {
    //         method: "POST",
    //         headers: {
    //             "Accept": "application/json",
    //         },
    //         body: body,
    //     }).then(async response => {
    //         if (!response.ok) {
    //             Swal.fire("Ошибка", "Во время запроса произошла ошибка сервера.", "error");
    //             throw new Error(`Ошибка при выполнении запроса: ${response.statusText}`)
    //         } else {
    //             const result = await response.json();
    //             Swal.fire(result.title, result.message, "success");
    //         }
    //     }).catch(error => {
    //         Swal.showValidationMessage(error)
    //     }).finally(() => {
    //         cropper.destroy();
    //         document.querySelector('form .btn-add').disabled = false;
    //         name.value = null;
    //         text.value = null;
    //         document.querySelector('#img').src = null;
    //         setClassHidden();
    //     });
    // });
    const body = new FormData();
    body.append('name', name.value);
    body.append('text', text.value);
    body.append('avatar', image.files[0]);

    document.querySelector('form .btn-add').disabled = true;
    fetch(e.target.action, {
        method: "POST",
        headers: {
            "Accept": "application/json",
        },
        body: body,
    }).then(async response => {
        if (!response.ok) {
            Swal.fire("Ошибка", "Во время запроса произошла ошибка сервера.", "error");
            throw new Error(`Ошибка при выполнении запроса: ${response.statusText}`)
        } else {
            const result = await response.json();
            Swal.fire(result.title, result.message, "success");
        }
    }).catch(error => {
        Swal.showValidationMessage(error)
    }).finally(() => {
        // cropper.destroy();
        document.querySelector('form .btn-add').disabled = false;
        name.value = null;
        text.value = null;
        document.querySelector('#img').src = null;
        setClassHidden();
    });
});

let reviewsId = new Set;
const getReviews = (append) => {
    fetch(document.querySelector('aside').dataset.url + `?except=${JSON.stringify(reviewsId)}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    }).then(response => response.json())
        .then(response => {
            let maxWidth = 300;
            let maxHeight = 300;
            response.forEach(review => {
                if (!reviewsId.has(review.id)) {
                    let date = new Date(Date.parse(review.created_at));
                    let el = document.createElement('div');
                    reviewsId.add(review.id);
                    el.classList.add('review');
                    el.innerHTML = '<div class="review-header">' +
                        `<img class="avatar" src="${review.avatar}" alt="Avatar">` +
                        '<div class="short-info">' +
                        `<h4>${review.name}</h4>` +
                        `<time>${date.toLocaleDateString('ru-RU')}</time>` +
                        '</div>' +
                        `<div class="text">${review.text}</div>` +
                        '</div>' +
                        '</div>';
                    append ? document.querySelector('.reviews').append(el) : document.querySelector('.reviews').prepend(el);
                    Ball.create(review.avatar, review.name, getRandomInt(2, 5), getRandomInt(2, 5))
                        .draw(getRandomInt(0, maxWidth + getRandomInt(2, 10)), getRandomInt(0, maxHeight + getRandomInt(8, 15)));
                }
            });
        });
};

window.onload = () => {
    document.body.querySelector('.reviews').replaceChildren();
    canvas.initialize();
    getReviews(true);
};

setInterval(() => {
    getReviews(false);
}, 8000);

document.querySelectorAll('.btn-open-aside, .btn-close-aside').forEach(el => {
    el.addEventListener('click', () => {
        document.body.querySelector('aside').classList.toggle('show');
    });
});

document.querySelectorAll('aside button.btn-add[type=button], .btn-cancel').forEach(el => {
    el.addEventListener('click', (e) => {
        setClassHidden(e);
    });
});

const setClassHidden = (e = undefined) => {
    e?.preventDefault();
    document.querySelector('aside button.btn-add[type=button]').classList.toggle('hidden');
    document.querySelectorAll('.reviews, .form-add-review').forEach(el => {
        el.classList.toggle('hidden');
    });
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};
