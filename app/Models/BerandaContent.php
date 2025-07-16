<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BerandaContent
 * 
 * Model for managing beranda (homepage) content including struktur organisasi and bidang data
 * 
 * @property int $id Primary key
 * @property string $content_type Content type: 'struktur_organisasi' or 'bidang'
 * @property string $key Unique identifier for content
 * @property string|null $title Content title
 * @property string|null $description Content description
 * @property string|null $photo_url URL path to photo (for struktur organisasi)
 * @property string|null $original_photo_url URL path to original photo (for struktur organisasi)
 * @property array|null $data JSON data for complex content (for bidang)
 * @property \Carbon\Carbon $created_at Creation timestamp
 * @property \Carbon\Carbon $updated_at Last update timestamp
 * 
 * Dynamic properties (set in controller):
 * @property string|null $temp_photo_url URL to temporary photo during upload
 * @property bool $has_temp_photo Whether temporary photo exists in session
 * 
 * @method static \App\Models\BerandaContent|null getByKey(string $key) Get content by key
 * @method static \App\Models\BerandaContent updateOrCreateByKey(string $key, array $data) Update or create content by key
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
     * 
     * @param string $key The unique key identifier
     * @return \App\Models\BerandaContent|null The content record or null if not found
     */
    public static function getByKey($key)
    {
        return self::where('key', $key)->first();
    }

    /**
     * Update or create content by key
     * 
     * @param string $key The unique key identifier
     * @param array $data The data to update or create
     * @return \App\Models\BerandaContent The updated or created content record
     */
    public static function updateOrCreateByKey($key, $data)
    {
        return self::updateOrCreate(
            ['key' => $key],
            $data
        );
    }
}
