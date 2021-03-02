import faker from "faker";
import { Customer } from "../model/Customer";
import FakeController from "./FakeController";

const data: Customer[] = [];

for (let i = 0; i < Math.random() * 500; i++) {
	const element: Customer = {
		id: faker.random.uuid(),
		email: faker.internet.email(),
		name: faker.name.findName(),
	};
	data.push(element);
}

export default class CustomerController extends FakeController<Customer> {
	constructor() {
		super();
		this.listT = data;
	}
}
