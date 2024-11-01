=== Plugin Name ===
Contributors: (vprzebinda)
Tags: aviation, flying, aircraft
Requires at least: 3.0.1
Tested up to: 3.4
Stable tag: 4.3
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Compute weight and balance for your aircraft.

== Description ==

Setup custom weight and balance calculator for your aircraft. Given weight,
and fuel quantity computes whether the aircraft is within limits and plots
where current loading is on the loading envelope.

= Shortcode Usage =

[weight_and_balance wb_empty_weight=lbs wb_empty_arm=inch-lbs wb_A_arm=lbs 
wb_B_arm=inch-lbs wb_C_arm=inch-lbs wb_fuel_arm=inch-lbs wb_fuel_weight=galons wb_bounding_box="arm,moment arm,moment ..."]

Shortcode arguments:

*  Empty weight and arm: wb_empty_weight=lbs and wb_emty_arm=inch-lbs
*  Any number of loading arms: wb_*_arm and optional default weight for each wb_*_weight. The weight can be expressed as an expression which is useful for fuel, eg 44*6 as a default weight means 44 gallons times 6 pounds per gallon.
*  A bounding box: Space separated list of arm,moment that describes the acceptable limits. wb_bounding_box="arm,moment ..."

Example:
[weight_and_balance wb_empty_weight=1519.75 wb_empty_arm=83.02 wb_front_arm=90.6 wb_rear_arm=126 wb_fuel_arm=94.8 wb_fuel_weight=52*6 wb_bounding_box="124,1525 156,1925 214,2400 222,2400 140,1525"]

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/weight-and-balance` directory.
2. Activate the plugin through the 'Plugins' screen in WordPress

== Disclaimer ==

Use at your own risk.

== Screenshots ==

1. Sample Weight and Balance.

== Changelog ==

= 0.1.0 =
* First release
