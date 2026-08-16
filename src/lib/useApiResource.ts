import { useState } from "react";
import type { AxiosInstance } from "axios";
import { unwrap, type ApiEnvelope } from "./api";
import { useAsyncAction } from "./useAsyncAction";

type ListResponse<T> = { items: T[]; total: number; page: number; pageSize: number };

/** FormData when a file is attached, a plain object otherwise. */
export type WriteBody = Record<string, unknown> | FormData;

/**
 * The list/create/update/remove shape every master screen needs — built on
 * the existing useAsyncAction + unwrap() helpers so each of the four
 * operations gets its own independent loading/error state (the table
 * shouldn't show a spinner because a create-drawer submit is in flight,
 * and vice versa).
 */
export function useApiResource<T>(client: AxiosInstance, basePath: string) {
  const [items, setItems] = useState<T[]>([]);
  const [total, setTotal] = useState(0);

  const list = useAsyncAction(async (params: Record<string, string | number | undefined> = {}) => {
    const response = await client.get<ApiEnvelope<ListResponse<T>>>(basePath, { params });
    const data = unwrap(response);
    setItems(data.items);
    setTotal(data.total);
  });

  const create = useAsyncAction(async (body: WriteBody) => {
    await client.post(basePath, body);
    await list.run({});
  });

  const update = useAsyncAction(async (id: string, body: WriteBody) => {
    await client.put(`${basePath}/${id}`, body);
    await list.run({});
  });

  const remove = useAsyncAction(async (id: string) => {
    await client.delete(`${basePath}/${id}`);
    await list.run({});
  });

  return { items, total, list, create, update, remove };
}
