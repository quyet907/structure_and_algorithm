import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "../model/BaseModel";
import { Paging } from "../model/Paging";

export default class FakeController<T extends BaseModel> {
	listT: T[];
	constructor() {
		this.listT = [];
	}

	get = (props: BaseListProps): Promise<Paging<T>> => {
		const { page, pageSize } = props;
		const startIndex = (page - 1) * pageSize;
		const endIndex = page * pageSize;

		const rows: T[] = this.listT.slice(startIndex, endIndex);

		const paging: Paging<T> = {
			page: page,
			pageSize: pageSize,
			rows: rows,
			total: this.listT.length,
			totalPages: Math.floor(this.listT.length / pageSize),
		};

		return Promise.resolve(paging);
	};

	save = (item: T): Promise<T> => {
		let modifyItem: T = {
			...item,
			id: uuidv4(),
		};
		this.listT.unshift(modifyItem);
		return Promise.resolve(item);
	};

	delete = (id: string): Promise<T | undefined> => {
		const item = this.listT.find((item) => item.id === id);
		if (item) this.listT.filter((item) => item.id !== id);
		return Promise.resolve(item);
	};
}

export interface BaseListProps {
	page: number;
	pageSize: number;
}
