<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BerandaContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'content_type',
        'key',
        'title',
        'description',
        'photo_url',
        'data'
    ];

    protected $casts = [
        'data' => 'array'
    ];

    /**
     * Get content by key
     */
    public static function getByKey($key)
    {
        return self::where('key', $key)->first();
    }

    /**
     * Update or create content by key
     */
    public static function updateOrCreateByKey($key, $data)
    {
        return self::updateOrCreate(
            ['key' => $key],
            $data
        );
    }
}
