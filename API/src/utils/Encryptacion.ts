import * as bcryptjs from "bcryptjs";

class Encryptacion {

    public static async encriptar(texto: string): Promise<any> {
        const salt = await bcryptjs.genSalt(10);
        let haspassword = bcryptjs.hash(texto, salt);

        return haspassword;
    }
}

export default Encryptacion