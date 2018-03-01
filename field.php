<?php
use Carbon_Fields\Carbon_Fields;
use Carbon_Field_Toggler\Toggler_Field;


define( 'Carbon_Field_Toggler\\DIR', __DIR__ );

Carbon_Fields::extend( Toggler_Field::class, function( $container ) {
	return new Toggler_Field( $container['arguments']['type'], $container['arguments']['name'], $container['arguments']['label'] );
} );
