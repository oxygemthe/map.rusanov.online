<aside data-url="{{ route('reviews') }}">
    <button class="btn-close-aside">
        <i class="fa fa-close"></i>
    </button>
    <h1 class="header">Ваши отзывы</h1>
    <section class="reviews">
        <div class="reviews-loading">Загрузка...</div>
    </section>
    <form class="form-add-review hidden" action="{{ route('review.add') }}" method="post">
        <div class="form-input">
            <label for="name">Имя <span class="required">*</span></label>
            <input id="name" type="text" name="name">
        </div>
        <div class="form-input">
            <label for="review">Что вам особенно понравилось? <span class="required">*</span></label>
            <textarea id="review" name="text" rows="6"></textarea>
        </div>
        <div class="form-input-file">
            <label for="image">Аватар <span class="required">*</span></label>
            <input id="image" type="file" accept="image/*" name="image">
{{--            <img id="img" src="">--}}
        </div>
        <button type="submit" class="btn btn-add"><i class="fa fa-check"></i> Отправить</button>
        <button type="submit" class="btn btn-cancel"><i class="fa fa-close"></i> Отмена</button>
    </form>
    <button type="button" class="btn btn-add"><i class="fa fa-pen"></i> Написать отзыв</button>
</aside>
