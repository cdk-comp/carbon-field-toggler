<?php
namespace Carbon_Field_Toggler;

use Carbon_Fields\Field\Field;

class Toggler_Field extends Field {

    /**
     * Load the field value.
     * Skipped, no value to be loaded.
     */
    public function load() {
        // skip;
    }

    /**
     * Save the field value.
     * Skipped, no value to be saved.
     */
    public function save() {
        // skip;
    }

    /**
     * Delete the field value.
     * Skipped, no value to be deleted.
     */
    public function delete() {
        // skip;
    }

    /**
     * Whether this field is required.
     * The Separator field is non-required by design.
     *
     * @return false
     */
    public function is_required() {
        return false;
    }

	/**
	 * Prepare the field type for use
	 * Called once per field type when activated
	 */
	public static function field_type_activated() {
		$dir = \Carbon_Field_Toggler\DIR . '/languages/';
		$locale = get_locale();
		$path = $dir . $locale . '.mo';
		load_textdomain( 'carbon-field-Toggler', $path );
	}

	/**
	 * Enqueue scripts and styles in admin
	 * Called once per field type
	 */
	public static function admin_enqueue_scripts() {
		$root_uri = \Carbon_Fields\Carbon_Fields::directory_to_url( \Carbon_Field_Toggler\DIR );

		# Enqueue JS
		wp_enqueue_script( 'carbon-field-Toggler', $root_uri . '/assets/js/bundle.js', array( 'carbon-fields-boot' ) );

		# Enqueue CSS
		wp_enqueue_style( 'carbon-field-Toggler', $root_uri . '/assets/css/field.css' );
	}
}
