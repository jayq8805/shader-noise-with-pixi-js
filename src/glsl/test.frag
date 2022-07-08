#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / (u_resolution.xy / 0.5);

    float time = u_time*0.2;
    
    // Calculate two points on screen.
    
    vec2 c1 = vec2(sin(u_time)*0.2, cos(u_time)*0.3);
    vec2 c2 = vec2(sin(time*0.7)*0.9, cos(u_time*0.65)*0.6);
    
    //Determine length to point 1 & calculate color.
    float d1 = length( uv - c1);
    vec3 color1 = palette( d1+time,
    vec3(1.0, 0.3176, 0.0),
    vec3(0.0, 0.8157, 1.0),
    vec3(1.0, 0.349, 0.0),
    vec3(1.0, 0.0, 0.0));
	
    //Determine length to point 2 & calculate color.
    float d2 = length( uv - c2);
    vec3 color2 = palette( d2+time,
    vec3(1.0, 0.0, 0.0),
    vec3(0.0, 0.7843, 1.0),
    vec3(0.4353, 0.0, 1.0),
    vec3(0.8078, 0.8078, 0.8078));
    
    // Output to screen
    gl_FragColor = vec4( (color1+color2) / 2.0 ,1.0);
}