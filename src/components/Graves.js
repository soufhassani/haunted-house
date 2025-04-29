import * as THREE from "three";

const gravesGroup = (graves) => {
  const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
  const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });
  for (let i = 0; i < 50; i++) {
    const side = Math.random() < 0.5 ? "rightSide" : "leftSide";
    let angle;
    if (side === "rightSide")
      angle = Math.random() * ((5 * Math.PI) / 6 - Math.PI / 6) + Math.PI / 6;
    // From 5π/6 to π/6
    else
      angle =
        Math.random() * ((11 * Math.PI) / 6 - (7 * Math.PI) / 6) +
        (7 * Math.PI) / 6; // From 2π/3 to 4π/3

    const radius = 3.5 + Math.random() * 6;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.castShadow = true;
    grave.receiveShadow = true;
    grave.position.set(x, 0.4, z);
    grave.rotation.y = (Math.random() - 0.5) * 0.2;
    grave.rotation.z = (Math.random() - 0.5) * 0.2;
    graves.add(grave);
  }
};

const Graves = () => {
  const graves = new THREE.Group();
  gravesGroup(graves);
  // graves.add(_walls, _roof, _door);
  return graves;
};

export default Graves;
