function InPolygon(point, vs) {
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

function PlotPolygon(point, vs) {
  var maxx = 0;
  var maxy = 0;
  var minx = Number.MAX_VALUE;
  var miny = Number.MAX_VALUE;
  for (var i = 0; i < vs.length; i++) {
    maxx = Math.max(maxx, vs[i][0]);
    maxy = Math.max(maxy, vs[i][1]);

    minx = Math.min(minx, vs[i][0]);
    miny = Math.min(miny, vs[i][1]);
  }
  minx--;
  miny--;
  maxx++;
  maxy = maxy + 200;

  var c = document.getElementById("wbchart");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();
  var originx = c.width * (vs[0][0] - minx) / (maxx - minx);
  var originy = c.height - c.height * (vs[0][1] - miny) / (maxy - miny);
  ctx.moveTo(originx, originy);
  for (var i = 1; i < vs.length; i++) {
    var x = vs[i][0];
    var y = vs[i][1];
    var px = c.width*(x-minx)/(maxx-minx);
    var py = c.height - c.height*(y-miny)/(maxy-miny);
    ctx.lineTo(px, py);
  }
  ctx.lineTo(originx, originy);
  var px = c.width*(point[0]-minx)/(maxx-minx);
  var py = c.height - c.height*(point[1]-miny)/(maxy-miny);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(px, py, 2, 0, 2 * Math.PI, true);
  ctx.fill();
  ctx.stroke();
}

function valueForId(id) {
    var raw = document.getElementById(id).value;
    if (raw == "") {
	return 0.;
    }
    return parseFloat(eval(raw));
}

function wbUpdate() {
    var elements = document.getElementsByTagName('input');
    var re = /^wb_weight_(.*)/;
    var total_weight = 0;
    var total_moment = 0;
    for (var i = 0; i < elements.length; i++) {
	var input = elements[i];
	subst = re.exec(input.id)
	if (subst != null) {
	    var position = subst[1];
	    var weight = valueForId("wb_weight_" + position);
	    var moment = valueForId("wb_arm_" + position);
	    total_weight = total_weight + weight;
	    total_moment = total_moment + moment * weight;
	}
    }
    total_moment = total_moment / 1000;

    var raw_bb = document.getElementById('wb_bounding_box').value;
    var bb_s_array = raw_bb.split(" ");

    polygon = new Array();
    for (var i = 0; i < bb_s_array.length; i++) {
	var e = bb_s_array[i];
	var point_parts = e.split(",");
	var x = parseFloat(point_parts[0]);
	var y = parseFloat(point_parts[1]);
	polygon.push(new Array(x,y));
    }
    PlotPolygon(new Array(total_moment, total_weight), polygon);
    var ok = InPolygon(new Array(total_moment, total_weight), polygon);
    var ok_s = "<font color=red>Out of limits!</font>";
    if (ok) {
      var ok_s = "<font color=green>Ok</font>";
    }   
    document.getElementById("wb_result").innerHTML=ok_s;
}
