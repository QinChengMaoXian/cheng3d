import { Triangle } from "../math/Triangle";
import { Vector3 } from "../math/Vector3";

// https://blog.csdn.net/fourierfeng/article/details/11969915

let a: number[][] = [[0,0,0], [0,0,0], [0,0,0]];

function get_vector4_det(v1: Vector3, v2: Vector3, v3: Vector3, v4: Vector3): number {
	for (let i = 0; i != 3; ++i ) {
		a[0][i] = v1.v[i] - v4.v[i];
		a[1][i] = v2.v[i] - v4.v[i];
		a[2][i] = v3.v[i] - v4.v[i];
	}
 
	return a[0][0] * a[1][1] * a[2][2] 
	+ a[0][1] * a[1][2] * a[2][0] 
	+ a[0][2] * a[1][0] * a[2][1] 
	- a[0][2] * a[1][1] * a[2][0] 
	- a[0][1] * a[1][0] * a[2][2] 
	- a[0][0] * a[1][2] * a[2][1];
}

function direction(p1x, p1y, p2x, p2y, px, py): number{
	return (px - p1x) * (p2y - p1y) - (p2x - p1x) * (py - p1y);
}

function on_segment(p1x, p1y, p2x, p2y, px, py): boolean {
    let max = p1x > p2x ? p1x : p2x;
	let min = p1x < p2x ? p1x : p2x;
	let max1 = p1y > p2y ? p1y : p2y;
    let min1 = p1y < p2y ? p1y : p2y;
    
	return (px >= min && px <= max && py >= min1 && py <= max1);
}

function get_central_point(centralPoint: Vector3, tri: Triangle) {
	centralPoint.x = (tri.point1.x + tri.point2.x + tri.point3.x);
	centralPoint.y = (tri.point1.y + tri.point2.y + tri.point3.y);
	centralPoint.z = (tri.point1.z + tri.point2.z + tri.point3.z);
}

function segments_intersert(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y): boolean {
    let d1, d2, d3, d4;
	d1 = direction(p3x, p3y, p4x, p4y, p1x, p1y);
	d2 = direction(p3x, p3y, p4x, p4y, p2x, p2y);
	d3 = direction(p1x, p1y, p2x, p2y, p3x, p3y);
    d4 = direction(p1x, p1y, p2x, p2y, p4x, p4y);
    
	if (d1 * d2 < 0 && d3 * d4 < 0) {
		return true;
	} else if (d1 == 0 && on_segment(p3x, p3y, p4x, p4y, p1x, p1y)) {
		return true;
	} else if (d2 == 0 && on_segment(p3x, p3y, p4x, p4y, p2x, p2y)) {
		return true;
	} else if (d3 == 0 && on_segment(p1x, p1y, p2x, p2y, p3x, p3y)) {
		return true;
	} else if (d4 == 0 && on_segment(p1x, p1y, p2x, p2y, p4x, p4y)) {
		return true;
    }
    
	return false;
}

function line_triangle_intersert_inSamePlane(tri: Triangle, v1: Vector3, v2: Vector3, i0 = 0, i1 = 1): boolean {

    let d1 = v1.v;
    let d2 = v2.v;
    let d3 = tri.point1.v;
    let d4 = tri.point2.v;

    if (segments_intersert(d1[i0], d1[i1], d2[i0], d2[i1], d3[i0], d3[i1], d4[i0], d4[i1])) {
        return true;
    }

    d3 = tri.point2.v;
    d4 = tri.point3.v;

    if (segments_intersert(d1[i0], d1[i1], d2[i0], d2[i1], d3[i0], d3[i1], d4[i0], d4[i1])) {
        return true;
    }

    d3 = tri.point1.v;
    d4 = tri.point3.v;

    if (segments_intersert(d1[i0], d1[i1], d2[i0], d2[i1], d3[i0], d3[i1], d4[i0], d4[i1])) {
        return true;
    }

    return false;
}

function is_point_within_triangle_3(tri: Triangle, vec: Vector3) {
    let v0 = Vector3.pool.create().subBy(tri.point3, tri.point1).mul(3);
    let v1 = Vector3.pool.create().subBy(tri.point2, tri.point1).mul(3);
    let v2 = Vector3.pool.create().copy(tri.point1).negate().mul(3).addAt(vec);

    let dot00 = v0.dot(v0);
    let dot01 = v0.dot(v1);
    let dot02 = v0.dot(v2);
    let dot11 = v1.dot(v1);
    let dot12 = v1.dot(v2);

    Vector3.pool.recovery(v0);
    Vector3.pool.recovery(v1);
    Vector3.pool.recovery(v2);

    let inverDeno = 1.0 / ( dot00* dot11 - dot01* dot01 );
    let u = ( dot11* dot02 - dot01* dot12 ) * inverDeno;

    if (u < 0 || u > 1) { // if u out of range, return directly
        return false;
    }

    let v = ( dot00* dot12 - dot01* dot02 ) * inverDeno;

    if ( v < 0 || v > 1 ) { // if v out of range, return directly
		return false;
    }    
    
	return u + v <= 1;
}

function triangle_intersert_inSamePlane(tri1: Triangle, tri2: Triangle): boolean {
    let v1 = Vector3.pool.create().subBy(tri1.point2, tri1.point1);
    let v2 = Vector3.pool.create().subBy(tri1.point3, tri1.point2);
    let d = Vector3.pool.create().crossBy(v1, v2);

    let i0 = 0, i1 = 1;
    if (d.z !== 0) {
        i0 = 0, i1 = 1;
    } else if (d.x !== 0) {
        i0 = 1, i1 = 2;
    } else if (d.y !== 0) {
        i0 = 0, i1 = 2;
    }

    Vector3.pool.recovery(v1);
    Vector3.pool.recovery(v2);
    Vector3.pool.recovery(d);

    if (line_triangle_intersert_inSamePlane(tri2, tri1.point1, tri1.point2, i0, i1)) {
		return true;
	} else if (line_triangle_intersert_inSamePlane(tri2, tri1.point2, tri1.point3, i0, i1)) {
		return true;
	} else if (line_triangle_intersert_inSamePlane(tri2, tri1.point1, tri1.point3, i0, i1)) {
		return true;
	} else {
        let centralPoint1 = Vector3.pool.create();
        let centralPoint2 = Vector3.pool.create();

        get_central_point(centralPoint1, tri1);
        get_central_point(centralPoint2, tri2);

        let result = is_point_within_triangle_3(tri2, centralPoint1) || is_point_within_triangle_3(tri1, centralPoint2);

        Vector3.pool.recovery(centralPoint1);
        Vector3.pool.recovery(centralPoint2);

        return result;
    }
}

function is_point_within_triangle(tri: Triangle, vec: Vector3) {
    let v0 = Vector3.pool.create().subBy(tri.point3, tri.point1);
    let v1 = Vector3.pool.create().subBy(tri.point2, tri.point1);
    let v2 = Vector3.pool.create().subBy(vec, tri.point1);

    let dot00 = v0.dot(v0);
    let dot01 = v0.dot(v1);
    let dot02 = v0.dot(v2);
    let dot11 = v1.dot(v1);
    let dot12 = v1.dot(v2);

    Vector3.pool.recovery(v0);
    Vector3.pool.recovery(v1);
    Vector3.pool.recovery(v2);

    let inverDeno = 1.0 / ( dot00* dot11 - dot01* dot01 );
    let u = ( dot11* dot02 - dot01* dot12 ) * inverDeno;

    if (u < 0 || u > 1) { // if u out of range, return directly
        return false;
    }

    let v = ( dot00* dot12 - dot01* dot02 ) * inverDeno;

    if ( v < 0 || v > 1 ) { // if v out of range, return directly
		return false;
    }    
    
	return u + v <= 1;
}

let nums = new Float32Array(9);

export function triangleIntersect(tri1: Triangle, tri2: Triangle): boolean {

    let tri1_a = tri1.point1, tri1_b = tri1.point2, tri1_c = tri1.point3;
    let tri2_a = tri2.point1, tri2_b = tri2.point2, tri2_c = tri2.point3;

    nums[0] = get_vector4_det(tri1_a, tri1_b, tri1_c, tri2_a);
    nums[1] = get_vector4_det(tri1_a, tri1_b, tri1_c, tri2_b);
    nums[2] = get_vector4_det(tri1_a, tri1_b, tri1_c, tri2_c);

    if (nums[0] > 0 && nums[1] > 0 && nums[2] > 0) {
        return false;
    } 
    
    if (nums[0] < 0 && nums[1] < 0 && nums[2] < 0) {
        return false;
    }

    if (nums[0] === 0 && nums[0] === 0 && nums[0] === 0) {
        return triangle_intersert_inSamePlane(tri1, tri2);
    }

    if (nums[0] === 0 && nums[1] * nums[2] > 0) {
        return is_point_within_triangle(tri1, tri2_a);
    } else if (nums[1] === 0 && nums[2] * nums[0] > 0) {
        return is_point_within_triangle(tri1, tri2_b);
    } else if (nums[2] === 0 && nums[0] * nums[1] > 0) {
        return is_point_within_triangle(tri1, tri2_c);
    }

    nums[3] = get_vector4_det(tri2_a, tri2_b, tri2_c, tri1_a);
    nums[4] = get_vector4_det(tri2_a, tri2_b, tri2_c, tri1_b);
    nums[5] = get_vector4_det(tri2_a, tri2_b, tri2_c, tri1_c);

    if (nums[3] > 0 && nums[4] > 0 && nums[5] > 0) {
        return false;
    } 
    
    if (nums[3] < 0 && nums[4] < 0 && nums[5] < 0) {
        return false;
    }

    if (nums[3] === 0 && nums[4] * nums[5] > 0) {
        return is_point_within_triangle(tri1, tri2_a);
    } else if (nums[4] === 0 && nums[5] * nums[3] > 0) {
        return is_point_within_triangle(tri1, tri2_b);
    } else if (nums[5] === 0 && nums[3] * nums[4] > 0) {
        return is_point_within_triangle(tri1, tri2_c);
    }

    let m;
    let im;

    if (nums[4] * nums[5] >= 0 && nums[3] !== 0) {
        if (nums[3] < 0) {
            m = tri2_b;
			tri2_b = tri2_c;
            tri2_c = m;
            
			im = nums[1];
			nums[1] = nums[2];
        }
    } else if (nums[3] * nums[5] >= 0 && nums[4] != 0) {
		m = tri1_a;
		tri1_a = tri1_b;
		tri1_b = tri1_c;
        tri1_c = m;
        
		if (nums[4] < 0) {
			m = tri2_b;
			tri2_b = tri2_c;
            tri2_c = m;
            
			im = nums[1];
			nums[1] = nums[2];
			nums[2] = im;
		}
	} else if (nums[3] * nums[4] >= 0 && nums[5] != 0) {
		m = tri1_a;
		tri1_a = tri1_c;
		tri1_c = tri1_b;
        tri1_b = m;

		if (nums[5] < 0) {
			m = tri2_b;
			tri2_b = tri2_c;
            tri2_c = m;
            
			im = nums[1];
			nums[1] = nums[2];
			nums[2] = im;
		}
	}
 
	if (nums[1] * nums[2] >= 0 && nums[0] != 0) {
		if ( nums[0] < 0 ) {
			m = tri1_b;
			tri1_b = tri1_c;
			tri1_c = m;
		}
	} else if (nums[0] * nums[2] >= 0 && nums[1] != 0) {
		m = tri2_a;
		tri2_a = tri2_b;
		tri2_b = tri2_c;
        tri2_c = m;
        
		if (nums[1] < 0) {
			m = tri1_b;
			tri1_b = tri1_c;
			tri1_c = m;
		}
	} else if (nums[0] * nums[1] >= 0 && nums[2] != 0) {
		m = tri2_a;
		tri2_a = tri2_c;
		tri2_c = tri2_b;
        tri2_b = m;
        
		if (nums[2] < 0) {
			m = tri1_b;
			tri1_b = tri1_c;
			tri1_c = m;
		}
    }
    
    return get_vector4_det(tri1_a, tri1_b, tri2_a, tri2_b) <= 0 
           && get_vector4_det(tri1_a, tri1_c, tri2_c, tri2_a) <= 0;
}
