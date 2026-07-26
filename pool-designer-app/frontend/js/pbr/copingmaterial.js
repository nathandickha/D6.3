// js/pbr/copingMaterial.js
import * as THREE from "https://esm.sh/three@0.158.0";
import { poolSceneAssetManager } from "../assets/PoolSceneAssetManager.js";

let cachedMaterial = null;

export async function loadCopingMaterial(scene) {
  if (cachedMaterial) return cachedMaterial;

  const textureSettings = {
    repeatX: 2,
    repeatY: 2,
    anisotropy: 12,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    magFilter: THREE.LinearFilter
  };

    /* -------------------------------------------------------
     ENVIRONMENT
     Environment is configured in scene.js (PMREM + background).
  ------------------------------------------------------- */


  /* -------------------------------------------------------
     LOAD PBR COPING TEXTURES THROUGH THE SHARED LAZY CACHE
  ------------------------------------------------------- */
  const [baseColor, normalMap, aoMap, roughnessMap, heightMap] = await Promise.all([
    poolSceneAssetManager.getTexture(new URL("../../textures/Coping/StoneEmbeddedTiles_DIFF_2K.webp", import.meta.url).href, {
      ...textureSettings,
      colorSpace: THREE.SRGBColorSpace
    }),
    poolSceneAssetManager.getTexture(new URL("../../textures/Coping/StoneEmbeddedTiles_NORMAL_2K.webp", import.meta.url).href, {
      ...textureSettings,
      colorSpace: THREE.NoColorSpace
    }),
    poolSceneAssetManager.getTexture(new URL("../../textures/Coping/StoneEmbeddedTiles_AO_2K.webp", import.meta.url).href, {
      ...textureSettings,
      colorSpace: THREE.NoColorSpace
    }),
    poolSceneAssetManager.getTexture(new URL("../../textures/Coping/StoneEmbeddedTiles_ROUGH_2K.webp", import.meta.url).href, {
      ...textureSettings,
      colorSpace: THREE.NoColorSpace
    }),
    poolSceneAssetManager.getTexture(new URL("../../textures/Coping/StoneEmbeddedTiles_DISP_2K.webp", import.meta.url).href, {
      ...textureSettings,
      colorSpace: THREE.NoColorSpace
    })
  ]);

  /* -------------------------------------------------------
     MATERIAL SETTINGS
  ------------------------------------------------------- */
  cachedMaterial = new THREE.MeshStandardMaterial({
    map: baseColor,
    normalMap,
    aoMap,
    roughnessMap,
    displacementMap: heightMap,

    displacementScale: 0.005,   // small relief
    roughness: 0.6,
    metalness: 0.0,

    envMapIntensity: 1.2,

    color: 0xffffff
  });

  cachedMaterial.userData.isCoping = true;

  return cachedMaterial;
}
