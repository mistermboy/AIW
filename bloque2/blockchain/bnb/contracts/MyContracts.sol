pragma solidity ^0.5.0;

contract MyContract {
    address[16] public perrosAdoptados;

    function adoptar(uint perroIndex) public returns (bool) {
        // Cpmprobación
        require(perroIndex >= 0 && perroIndex <= 15);

        bool adoptadoConExito = true;
        
        if ( perrosAdoptados[perroIndex] == address(0) ){
            // msg.sender address del usuario que invoco al contrato
            perrosAdoptados[perroIndex] = msg.sender;
        } else {
            adoptadoConExito = false ;
        }

        return adoptadoConExito;
    }

    function getPerrosAdoptados() public view returns (address[16] memory) {
        return perrosAdoptados;
    }


}
