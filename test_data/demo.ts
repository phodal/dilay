import * as fs from "fs";
import DemoClass from "./demo-class";

export default class DemoComponent {
  constructor(private demoClass: DemoClass) {

  }

  funcA(path: string) {
    this.demoClass.print();
    return fs.readFileSync(path);
  }
}

// @ts-ignore
function HelperUtil() {

}

// @ts-ignore
interface IDemo {

}
