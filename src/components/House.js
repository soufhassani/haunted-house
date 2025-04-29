import * as THREE from "three";
import useTextures from "../hooks/useTextures";
import shadowOptimizer from "../utils/shadowOptimizer";

const wallSize = {
  height: 2.5,
  width: 4,
};
const roofSize = {
  height: 1.5,
};
const doorSize = {
  height: 2,
};
const doorLight = (gui) => {
  const _doorLight = new THREE.PointLight("#ff7d46", 1, 7);
  _doorLight.position.set(0, 2.2, 2.7);
  _doorLight.castShadow = true;
  shadowOptimizer(_doorLight);
  gui.add(_doorLight, "intensity").min(0).max(5).step(0.05);
  gui.add(_doorLight, "distance").min(-100).max(100).step(1);
  gui.add(_doorLight.position, "x").min(-5).max(5).step(0.1);
  gui.add(_doorLight.position, "y").min(-5).max(5).step(0.05);
  gui.add(_doorLight.position, "z").min(-5).max(5).step(0.05);
  return _doorLight;
};

const bushes = (house) => {
  const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
  const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });
  const _bushes = [
    { scale: { x: 0.5, y: 0.5, z: 0.5 }, position: { x: 0.8, y: 0.2, z: 2.2 } },
    {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 1.4, y: 0.1, z: 2.1 },
    },
    {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: -0.8, y: 0.1, z: 2.2 },
    },
    {
      scale: { x: 0.15, y: 0.15, z: 0.15 },
      position: { x: -1, y: 0.05, z: 2.6 },
    },
  ];

  for (const bush of _bushes) {
    const { position, scale } = bush;
    const mesh = new THREE.Mesh(bushGeometry, bushMaterial);
    mesh.position.set(position.x, position.y, position.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.scale.set(scale.x, scale.y, scale.z);
    house.add(mesh);
  }
};

const door = () => {
  const { width } = wallSize;
  const { height } = doorSize;
  const { doorTextures } = useTextures();
  const _door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, height, 100, 100),
    new THREE.MeshStandardMaterial({
      map: doorTextures.color,
      transparent: true,
      alphaMap: doorTextures.alpha,
      aoMap: doorTextures.ambientOcc,
      aoMapIntensity: 1,
      displacementMap: doorTextures.height,
      displacementScale: 0.1,
      normalMap: doorTextures.normal,
      metalnessMap: doorTextures.metalness,
      roughnessMap: doorTextures.roughness,
    })
  );

  _door.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(_door.geometry.attributes.uv.array, 2)
  );
  _door.position.y = height / 2 - 0.05; // 0.05 is the number to make door at touche the ground;
  _door.position.z = width / 2 + 0.0001;

  return _door;
};

const roof = () => {
  const { height: wallsHeight } = wallSize;
  const { height: roofHeight } = roofSize;
  const _roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, roofHeight, 4),
    new THREE.MeshStandardMaterial({ color: "#b35f45" })
  );

  _roof.castShadow = true;
  _roof.position.y = wallsHeight + roofHeight / 2;
  _roof.rotation.y = Math.PI / 4;

  return _roof;
};

const walls = () => {
  const { wallsTextures } = useTextures();
  const { height } = wallSize;
  const _walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, height, 4),
    new THREE.MeshStandardMaterial({
      map: wallsTextures.color,
      aoMap: wallsTextures.ambientOcc,
      normalMap: wallsTextures.normal,
      roughnessMap: wallsTextures.roughness,
    })
  );
  _walls.castShadow = true;
  _walls.receiveShadow = true;
  _walls.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(_walls.geometry.attributes.uv.array, 2)
  );
  _walls.position.y = height / 2;

  return _walls;
};

const House = ({ gui }) => {
  const house = new THREE.Group();
  const _walls = walls();
  const _roof = roof();
  const _door = door();
  bushes(house);
  const _doorLight = doorLight(gui);
  house.add(_walls, _roof, _door, _doorLight);
  return house;
};

export default House;
