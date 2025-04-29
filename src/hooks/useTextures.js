import * as THREE from "three";

const floorTextures = (loader) => {
  const color = loader.load("/textures/grass/color.jpg");
  const ambientOcc = loader.load("/textures/grass/ambientOcclusion.jpg");
  const normal = loader.load("/textures/grass/normal.jpg");
  const roughness = loader.load("/textures/grass/roughness.jpg");
  return {
    color,
    ambientOcc,
    normal,
    roughness,
  };
};

const wallsTextures = (loader) => {
  const color = loader.load("/textures/bricks/color.jpg");
  const ambientOcc = loader.load("/textures/bricks/ambientOcclusion.jpg");
  const normal = loader.load("/textures/bricks/normal.jpg");
  const roughness = loader.load("/textures/bricks/roughness.jpg");
  return {
    color,
    ambientOcc,
    normal,
    roughness,
  };
};

const doorTextures = (loader) => {
  const color = loader.load("/textures/door/color.jpg");
  const alpha = loader.load("/textures/door/alpha.jpg");
  const ambientOcc = loader.load("/textures/door/ambientOcclusion.jpg");
  const height = loader.load("/textures/door/height.jpg");
  const metalness = loader.load("/textures/door/metalness.jpg");
  const normal = loader.load("/textures/door/normal.jpg");
  const roughness = loader.load("/textures/door/roughness.jpg");
  return {
    alpha,
    ambientOcc,
    color,
    height,
    metalness,
    normal,
    roughness,
  };
};

const useTextures = () => {
  const textureLoader = new THREE.TextureLoader();
  const _doorTextures = doorTextures(textureLoader);
  const _wallsTextures = wallsTextures(textureLoader);
  const _floorTextures = floorTextures(textureLoader);
  return {
    doorTextures: _doorTextures,
    wallsTextures: _wallsTextures,
    floorTextures: _floorTextures,
  };
};

export default useTextures;
