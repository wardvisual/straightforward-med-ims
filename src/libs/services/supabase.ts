import { supabase } from "../../supbaseClient";

const supabaseService = {
  table: "",

  setTable: (_table) => {
    supabaseService.table = _table;
  },

  fetchAll: async (query?: any) => {
    const { data, error } = await supabase
      .from(supabaseService.table)
      .select(query ? query : "*");

    if (error) {
      return {
        status: false,
        result: error,
      };
    }

    return {
      status: true,
      result: data,
    };
  },

  fetchById: async (stateId: string) => {
    const { data, error } = await supabase
      .from(supabaseService.table)
      .select("*")
      .eq("id", stateId)
      .single();
    if (error) {
      return {
        status: false,
        result: error,
      };
    }
    return {
      status: true,
      result: data,
    };
  },

  selectBy: async (selector: string, value: string) => {
    const { data, error } = await supabase
      .from(supabaseService.table)
      .select("*")
      .eq(selector, value)
      .single();
    if (error) {
      return {
        status: false,
        result: error,
      };
    }
    return {
      status: true,
      result: data,
    };
  },

  add: async (state: any) => {
    const { data, error } = await supabase
      .from(supabaseService.table)
      .insert(state);

    if (error) {
      return {
        status: false,
        result: error,
      };
    }
    return {
      status: true,
      result: data,
    };
  },

  update: async (id: string, state: any) => {
    const { data, error } = await supabase
      .from(supabaseService.table)
      .update(state)
      .eq("id", id);
    if (error) {
      return {
        status: false,
        result: error,
      };
    }

    return {
      status: true,
      result: data,
    };
  },

  updateAll: async (state: any) => {
    const { data, error } = await supabase
      .from(supabaseService.table)
      .update(state)
      .eq(`public`, true);

    if (error) {
      return {
        status: false,
        result: error,
      };
    }

    return {
      status: true,
      result: data,
    };
  },

  deleteById: async (stateId: string) => {
    const { data, error }: any = await supabase
      .from(supabaseService.table)
      .delete()
      .eq("id", stateId);

    if (error) {
      return {
        status: false,
        result: error,
      };
    }
    return {
      status: true,
      result: data,
    };
  },

  subscribeToEvent: async (table: string, callBack: (_: any) => any) => {
    supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table },
        (payload) => callBack(payload)
      )
      .subscribe();
  },
};

export default supabaseService;
