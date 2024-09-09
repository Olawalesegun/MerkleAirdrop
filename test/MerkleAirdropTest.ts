import {time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("MyTest", function(){
  async function globalRun(){
    const Token_ADDR = "0xf74ce8fcBDc165de4CCe4a9A645975a984e3E891";
    const MERKLE_ROOTHASH= "0xb90d566c79c944da6a663f686fe53871e99a6daac4b06f57e442b52165b529ae";
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const MerkleAirdropFactory = await hre.ethers.getContractFactory("MerkleAirdrop");
    const merkleAirdrop = await MerkleAirdropFactory.deploy(Token_ADDR, MERKLE_ROOTHASH);

    return {merkleAirdrop, owner, otherAccount, MERKLE_ROOTHASH, Token_ADDR};
  }

  describe("Deployment", function(){
    it("Should acknowledge the token address", async function(){
      const { Token_ADDR, merkleAirdrop, owner } = await loadFixture(globalRun);

      expect(await merkleAirdrop.tokenAddress()).to.equal(Token_ADDR);
    });

    it("Should acknowledge and confirm merkleRoot", async function(){
      const {MERKLE_ROOTHASH, merkleAirdrop} = await loadFixture(globalRun);

      expect(await merkleAirdrop.merkleRoot()).to.equal(MERKLE_ROOTHASH);
    });

    it("Should return the owner when we try to confirm who depployed", async function(){
      const {merkleAirdrop, owner} = await loadFixture(globalRun);

      expect(await merkleAirdrop.owner()).to.equal(owner)
    })
  })



  globalRun();
})
