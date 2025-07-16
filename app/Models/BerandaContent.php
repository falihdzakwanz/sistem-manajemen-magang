<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BerandaContent
 * 
 * @property int $id
 * @property string $content_type
 * @property string $key
 * @property string|null $title
 * @property string|null $description
 * @property string|null $photo_url
 * @property string|null $original_photo_url
 * @property array|null $data
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * Dynamic properties (set in controller):
 * @property string|null $temp_photo_url
 * @property bool $has_temp_photo
 */
class BerandaContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'content_type',
        'key',
        'title',
        'description',
        'photo_url',
        'original_photo_url',
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
