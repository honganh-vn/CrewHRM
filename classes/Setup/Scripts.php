<?php
/**
 * Static built scripts provider
 *
 * @package crewhrm
 */

namespace CrewHRM\Setup;

use CrewHRM\Helpers\Colors;
use CrewHRM\Helpers\Utilities;
use CrewHRM\Main;
use CrewHRM\Models\Settings;
use CrewHRM\Models\Stage;
use CrewHRM\Models\User;

/**
 * Script handler class
 */
class Scripts {

	/**
	 * Script handler constructor
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', array( $this, 'adminScripts' ), 11 );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontendScripts' ), 11 );

		// Color pallete
		add_action( 'wp_head', array( $this, 'loadVariables' ), 1000 );
		add_action( 'admin_head', array( $this, 'loadVariables' ), 1000 );

		// Load text domain
		add_action( 'init', array( $this, 'loadTextDomain' ) );
	}

	/**
	 * Load scripts in backend dashboard
	 *
	 * @return void
	 */
	public function adminScripts() {
		// Load script for the main hrm dashboard
		if ( Utilities::isCrewDashboard() ) {
			if ( current_user_can( 'upload_files' ) ) {
				wp_enqueue_media();
			}
			wp_enqueue_script( 'crewhrm-hrm', Main::$configs->dist_url . 'hrm.js', array( 'jquery', 'wp-i18n' ), Main::$configs->version, true );
		}

		// Load scripts for setting and company profile
		if ( Utilities::isCrewDashboard( array( Admin::SLUG_SETTINGS ) ) ) {
			if ( current_user_can( 'upload_files' ) ) {
				wp_enqueue_media();
			}
			wp_enqueue_script( 'crewhrm-settings', Main::$configs->dist_url . 'settings.js', array( 'jquery', 'wp-i18n' ), Main::$configs->version, true );
		}

		if ( Utilities::isCrewDashboard( Addon::PAGE_SLUG ) ) {
			wp_enqueue_script( 'crewhrm-addons-script', Main::$configs->dist_url . 'addons-page.js', array( 'jquery', 'wp-i18n' ), Main::$configs->version, true );
		}
	}

	/**
	 * Load scripts for frontend view
	 *
	 * @return void
	 */
	public function frontendScripts() {
		if ( Utilities::isCareersPage() ) {
			wp_enqueue_script( 'crewhrm-careers', Main::$configs->dist_url . 'careers.js', array( 'jquery', 'wp-i18n' ), Main::$configs->version, true );
		}
	}

	/**
	 * Load js and css variables
	 *
	 * @return void
	 */
	public function loadVariables() {
		// Check if it's our page and needs resources to load
		if ( ! Utilities::isCrewDashboard() && ! Utilities::isCareersPage() ) {
			return;
		}

		// Load dynamic colors
		$dynamic_colors = Colors::getColors();
		$_colors        = '';
		foreach ( $dynamic_colors as $name => $code ) {
			$_colors .= '--crewmat-color-' . esc_attr( $name ) . ':' . esc_attr( $code ) . ';';
		}
		echo '<style>[id^="crewhrm_"],[id^="crewhrm-"]{' . $_colors . '}</style>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		// Prepare nonce
		$nonce_action = '_crewhrm_' . str_replace( '-', '_', date( 'Y-m-d' ) );
		$nonce        = wp_create_nonce( $nonce_action );

		// Load JS variables
		$data = apply_filters(
			'crewhrm_frontend_data',
			array(
				'app_name'          => Main::$configs->app_name,
				'white_label'       => Utilities::getWhiteLabel(),
				'action_hooks'      => array(),
				'filter_hooks'      => array(),
				'home_url'          => get_home_url(),
				'dist_url'          => Main::$configs->dist_url,
				'plugin_url'        => Main::$configs->url,
				'ajaxurl'           => admin_url( 'admin-ajax.php' ),
				'colors'            => $dynamic_colors,
				'reserved_stages'   => array_keys( Stage::$reserved_stages ),
				'nonce_action'      => $nonce_action,
				'nonce'             => $nonce,
				'has_pro'           => Main::$configs->has_pro,
				'wp_max_size'       => Settings::getWpMaxUploadSize(),
				'date_format'       => get_option( 'date_format' ),
				'time_format'       => get_option( 'time_format' ),
				'admin_url'         => add_query_arg( array( 'page' => '' ), admin_url( 'admin.php' ) ),
				'current_user'      => User::getUserInfo( get_current_user_id() ),
				'company_address'   => array(
					'street_address' => Settings::getSetting( 'street_address', '' ),
					'city'           => Settings::getSetting( 'city', '' ),
					'province'       => Settings::getSetting( 'province', '' ),
					'zip_code'       => Settings::getSetting( 'zip_code', '' ),
					'country_code'   => Settings::getSetting( 'country_code', '' ),
				)
			)
		);

		// Determine data pointer
		$pattern = '/\/([^\/]+)\/wp-content\/(plugins|themes)\/([^\/]+)\/.*/';
		preg_match( $pattern, Main::$configs->url, $matches );
		$parsedString = strtolower( "CrewMat_{$matches[1]}_{$matches[3]}" );
		$parsedString = preg_replace( '/[^a-zA-Z0-9_]/', '', $parsedString );
		echo '<script>
				window.' . $parsedString . '=' . wp_json_encode( $data ) . ';
				window.' . $parsedString . 'pro=window.' . $parsedString . ';
			</script>';
	}

	/**
	 * Load text domain for translations
	 *
	 * @return void
	 */
	public function loadTextDomain() {
		load_plugin_textdomain( Main::$configs->text_domain, false, Main::$configs->dir . 'languages' );
	}
}
