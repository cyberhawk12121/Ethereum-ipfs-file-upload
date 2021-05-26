pragma solidity >=0.4.21 <0.6.0;

contract StoreHash{
    string imageHash;

    // Write Function
    function set(string memory _imageHash) public {
        imageHash= _imageHash;
    }
    // Read function that reads the value of imageHash (It wasn't needed if imageHash was public)
    function get() public view returns (string memory){
        return imageHash;
    }
}