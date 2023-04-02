<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'name',
        'text',
        'avatar'
    ];

    protected function avatar(): Attribute {
        return Attribute::make(
            get: fn(string $val) => asset($val)
        )->shouldCache();
    }
}
