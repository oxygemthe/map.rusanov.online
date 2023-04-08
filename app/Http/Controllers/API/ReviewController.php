<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Storage;
use Str;
use Validator;

class ReviewController extends Controller
{
    public function toPublishReview(Request $request)
    {
        Validator::make($request->all(), [
            'name' => 'required|min:2',
            'text' => 'required',
            'avatar' => 'required|image'
        ])->validate();

        $date = date_format(now(), "Y/m");
        $path = "avatars/$date/" . Str::random() . '.jpg';
        ini_set('memory_limit', '1024M');
        $image = Image::make($request->file('avatar')->getRealPath());
        $image->fit(220, 220);
        $image = $image->stream('jpg', 70);
        Storage::put($path, $image);

        Review::query()->create([
            'name' => $request->get('name'),
            'text' => $request->get('text'),
            'avatar' => $path
        ]);
        return response()->json([
            'title' => 'Спасибо!',
            'message' => '<div>Нам очень важно ваше мнение,</div><div>Ваш отзыв скоро появится в списке.</div>'
        ]);
    }

    public function getReviews()
    {
        return Review::query()->orderBy('created_at', 'desc')->limit(20)->get();
    }
}
