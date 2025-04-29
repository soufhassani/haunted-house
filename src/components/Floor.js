import * as THREE from "three";
import useTextures from "../hooks/useTextures";

const handleRepeat = (floorTextures) => {
  floorTextures.color.repeat.set(8, 8);
  handleRepeatWrapping(floorTextures.color);
  floorTextures.ambientOcc.repeat.set(8, 8);
  handleRepeatWrapping(floorTextures.ambientOcc);
  floorTextures.normal.repeat.set(8, 8);
  handleRepeatWrapping(floorTextures.normal);
  floorTextures.roughness.repeat.set(8, 8);
  handleRepeatWrapping(floorTextures.roughness);
};
const handleRepeatWrapping = (texture) => {
  texture.wrapT = THREE.RepeatWrapping;
  texture.wrapS = THREE.RepeatWrapping;
};

const Floor = () => {
  const { floorTextures } = useTextures();
  handleRepeat(floorTextures);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
      map: floorTextures.color,
      aoMap: floorTextures.ambientOcc,
      normalMap: floorTextures.normal,
      roughnessMap: floorTextures.roughness,
    })
  );
  floor.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
  );
  floor.receiveShadow = true;
  floor.rotation.x = -Math.PI * 0.5;
  floor.position.y = 0;
  return floor;
};

export default Floor;
