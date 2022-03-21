const { ethers, upgrades } = require("hardhat");

async function main() {
  const MaticShiba = await ethers.getContractFactory("MaticShiba");
  const maticShiba = await upgrades.deployProxy(MaticShiba);
  await maticShiba.deployed();
  console.log("MaticShiba deployed to:", maticShiba.address);
}

main();
