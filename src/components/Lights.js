import * as THREE from "three";

const moonLight = (gui) => {
  const _moonLight = new THREE.DirectionalLight("#b9d5ff", 0.035);
  _moonLight.castShadow = true;
  _moonLight.position.set(4, 5, -2);
  gui.add(_moonLight, "intensity").min(0).max(1).step(0.001);
  gui.add(_moonLight.position, "x").min(-5).max(5).step(0.001);
  gui.add(_moonLight.position, "y").min(-5).max(5).step(0.001);
  gui.add(_moonLight.position, "z").min(-5).max(5).step(0.001);
  return _moonLight;
};

const ambientLight = (gui) => {
  const _ambientLight = new THREE.AmbientLight("#b9d5ff", 0.05);
  gui.add(_ambientLight, "intensity").min(0).max(1).step(0.001);
  return _ambientLight;
};

const Lights = ({ gui }) => {
  const lightGroup = new THREE.Group();
  const _ambientLight = ambientLight(gui);
  const _moonLight = moonLight(gui);
  lightGroup.add(_ambientLight, _moonLight);
  return lightGroup;
};

export default Lights;
