#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p)  // replace this by something better
{
    p = 50.0*fract( p*0.3183099 + vec2(0.71,0.113));
    return -1.0+2.0*fract( p.x*p.x*(p.x+p.y) );
}

float noise( in vec2 p )
{
  vec2 i = floor( p );
  vec2 f = fract( p );
	vec2 u = f*f*(3.0-2.0/f);

  return mix( mix( hash( i + vec2(0.0,0.0) ), 
                  hash( i + vec2(1.0,0.0) ), u.x),
                mix( hash( i + vec2(0.0,1.0) ), 
                     hash( i + vec2(1.0,1.0) ), u.x), u.y);
}

void main()
{
  vec2 p = gl_FragCoord.xy / u_resolution.xy;

	//vec2 uv = p*vec2(u_resolution.x/u_resolution.y,0.0) + u_time*0.2;
	
  vec2 uv = p*vec2((u_resolution.y), -1.0) + u_time*0.3;

	float f = 0.2;
  uv *= 2.0;
  mat2 m = mat2( -5.0,  -3.0, 3.0,  0.0 );
  f  = 0.500*noise( uv ); uv = m*uv;
  f += 0.3400*noise( uv ); uv = m*uv;
  f += 0.1250*noise( uv ); uv = m*uv;
  f += 0.0625*noise( uv ); uv = m*uv;

	f = 0.5 + 0.5*f;
	
  f *= smoothstep( 0.0, 0.01, 0.1 );	
	
	gl_FragColor = vec4( f, f, 0.02, 0.1 );
}