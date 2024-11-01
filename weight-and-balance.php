<?php
/*
* Plugin Name: Weight and balance
* Description: Aircraft weight and balance
* Version: 1.0
* Author: vprzebinda
*/

// Example 2 : WP Shortcode to display text on page or post.
function weight_and_balance($atts) {
wp_enqueue_script( 'weight_and_balance_js', plugins_url( 'wb.js', __FILE__ ));
$ret .= '<div>';
$ret .= '<div style="visibility: hidden">ewzvrahpcy</div>';
$ret .= 'Weight and Balance Calculator<br>';
$ret .= '<table>';
$ret .= '<tr><th></th><th>Weight</th></tr>';
foreach ($atts as $key => $value) {
  if (preg_match('/wb_empty_weight/', $key)) {
    $ret .= '<input type=hidden id="wb_weight_empty" value="' . $value . '"></input>';
  } elseif (preg_match('/wb_empty_arm/', $key)) {
    $ret .= '<input type=hidden id="wb_arm_empty" value="' . $value . '"></input>';
  } elseif (preg_match('/wb_(.*)_arm/', $key, $matches)) {
    $ret .= '<tr>';
    $units = 'pounds';
    $ret .= '<td><b>' . $matches[1] . '</b></td><td>' . '<input type=text id=wb_weight_'  . 
          $matches[1] . ' onchange="wbUpdate()" value="' . $atts['wb_' . $matches[1] . '_weight'] . '"></input>' . $units . '</td>';
    $ret .= '<input type=hidden id=wb_arm_'  . $matches[1] . ' onchange="wbUpdate()" value="' .
          $value . '"></input>';
    $ret .= '</tr>';
  } elseif (preg_match('/wb_bounding_box/', $key, $matches)) {
    $ret .= '<input type=hidden id="wb_bounding_box" value="' . $value . '"></input>';
  }
}
$ret .= '<tr><td><a onclick="wbUpdate()">update</a></td><td><div id="wb_result"></div></td></tr>';
$ret .= '</table>';
$ret .= '</div>';
$ret .= '<canvas id="wbchart" width="300" height="150" style="border:1px solid #d3d3d3;">';
$ret .= '</canvas>';
$ret .= '<script type="text/javascript">wbUpdate();</script>';
return $ret;
}
add_shortcode('weight_and_balance', 'weight_and_balance');

?>

