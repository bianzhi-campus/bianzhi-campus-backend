export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: any; output: any; }
  json: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** 账户表，存放一些第三方账号等，方便用户登录 */
export type Accounts = {
  __typename?: 'accounts';
  /** 账户信息，如授权后返回的头像、用户昵称等 */
  account_info?: Maybe<Scalars['json']['output']>;
  /** 账号提供商，可选：1.weixin_mini_program（微信小程序）2.weixin_public_account（微信公众号）3.tencent_open_platform（腾讯开放平台） */
  account_provider: Scalars['String']['output'];
  /** 账号提供商对应的应用appid */
  account_provider_appid: Scalars['String']['output'];
  /** 账号授权的openid */
  account_provider_openid: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An array relationship */
  user_accounts: Array<User_Accounts>;
  /** An aggregate relationship */
  user_accounts_aggregate: User_Accounts_Aggregate;
};


/** 账户表，存放一些第三方账号等，方便用户登录 */
export type AccountsAccount_InfoArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** 账户表，存放一些第三方账号等，方便用户登录 */
export type AccountsUser_AccountsArgs = {
  distinct_on?: InputMaybe<Array<User_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Accounts_Order_By>>;
  where?: InputMaybe<User_Accounts_Bool_Exp>;
};


/** 账户表，存放一些第三方账号等，方便用户登录 */
export type AccountsUser_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Accounts_Order_By>>;
  where?: InputMaybe<User_Accounts_Bool_Exp>;
};

/** aggregated selection of "accounts" */
export type Accounts_Aggregate = {
  __typename?: 'accounts_aggregate';
  aggregate?: Maybe<Accounts_Aggregate_Fields>;
  nodes: Array<Accounts>;
};

/** aggregate fields of "accounts" */
export type Accounts_Aggregate_Fields = {
  __typename?: 'accounts_aggregate_fields';
  avg?: Maybe<Accounts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Accounts_Max_Fields>;
  min?: Maybe<Accounts_Min_Fields>;
  stddev?: Maybe<Accounts_Stddev_Fields>;
  stddev_pop?: Maybe<Accounts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Accounts_Stddev_Samp_Fields>;
  sum?: Maybe<Accounts_Sum_Fields>;
  var_pop?: Maybe<Accounts_Var_Pop_Fields>;
  var_samp?: Maybe<Accounts_Var_Samp_Fields>;
  variance?: Maybe<Accounts_Variance_Fields>;
};


/** aggregate fields of "accounts" */
export type Accounts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Accounts_Avg_Fields = {
  __typename?: 'accounts_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "accounts". All fields are combined with a logical 'AND'. */
export type Accounts_Bool_Exp = {
  _and?: InputMaybe<Array<Accounts_Bool_Exp>>;
  _not?: InputMaybe<Accounts_Bool_Exp>;
  _or?: InputMaybe<Array<Accounts_Bool_Exp>>;
  account_info?: InputMaybe<Json_Comparison_Exp>;
  account_provider?: InputMaybe<String_Comparison_Exp>;
  account_provider_appid?: InputMaybe<String_Comparison_Exp>;
  account_provider_openid?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_accounts?: InputMaybe<User_Accounts_Bool_Exp>;
  user_accounts_aggregate?: InputMaybe<User_Accounts_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "accounts" */
export enum Accounts_Constraint {
  /** unique or primary key constraint on columns "account_provider_appid", "account_provider", "account_provider_openid" */
  AccountsAccountProviderAccountProviderAppidAccountPrKey = 'accounts_account_provider_account_provider_appid_account_pr_key',
  /** unique or primary key constraint on columns "id" */
  AccountsPkey = 'accounts_pkey'
}

/** input type for incrementing numeric columns in table "accounts" */
export type Accounts_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "accounts" */
export type Accounts_Insert_Input = {
  /** 账户信息，如授权后返回的头像、用户昵称等 */
  account_info?: InputMaybe<Scalars['json']['input']>;
  /** 账号提供商，可选：1.weixin_mini_program（微信小程序）2.weixin_public_account（微信公众号）3.tencent_open_platform（腾讯开放平台） */
  account_provider?: InputMaybe<Scalars['String']['input']>;
  /** 账号提供商对应的应用appid */
  account_provider_appid?: InputMaybe<Scalars['String']['input']>;
  /** 账号授权的openid */
  account_provider_openid?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_accounts?: InputMaybe<User_Accounts_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Accounts_Max_Fields = {
  __typename?: 'accounts_max_fields';
  /** 账号提供商，可选：1.weixin_mini_program（微信小程序）2.weixin_public_account（微信公众号）3.tencent_open_platform（腾讯开放平台） */
  account_provider?: Maybe<Scalars['String']['output']>;
  /** 账号提供商对应的应用appid */
  account_provider_appid?: Maybe<Scalars['String']['output']>;
  /** 账号授权的openid */
  account_provider_openid?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Accounts_Min_Fields = {
  __typename?: 'accounts_min_fields';
  /** 账号提供商，可选：1.weixin_mini_program（微信小程序）2.weixin_public_account（微信公众号）3.tencent_open_platform（腾讯开放平台） */
  account_provider?: Maybe<Scalars['String']['output']>;
  /** 账号提供商对应的应用appid */
  account_provider_appid?: Maybe<Scalars['String']['output']>;
  /** 账号授权的openid */
  account_provider_openid?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "accounts" */
export type Accounts_Mutation_Response = {
  __typename?: 'accounts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Accounts>;
};

/** input type for inserting object relation for remote table "accounts" */
export type Accounts_Obj_Rel_Insert_Input = {
  data: Accounts_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Accounts_On_Conflict>;
};

/** on_conflict condition type for table "accounts" */
export type Accounts_On_Conflict = {
  constraint: Accounts_Constraint;
  update_columns?: Array<Accounts_Update_Column>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};

/** Ordering options when selecting data from "accounts". */
export type Accounts_Order_By = {
  account_info?: InputMaybe<Order_By>;
  account_provider?: InputMaybe<Order_By>;
  account_provider_appid?: InputMaybe<Order_By>;
  account_provider_openid?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_accounts_aggregate?: InputMaybe<User_Accounts_Aggregate_Order_By>;
};

/** primary key columns input for table: accounts */
export type Accounts_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "accounts" */
export enum Accounts_Select_Column {
  /** column name */
  AccountInfo = 'account_info',
  /** column name */
  AccountProvider = 'account_provider',
  /** column name */
  AccountProviderAppid = 'account_provider_appid',
  /** column name */
  AccountProviderOpenid = 'account_provider_openid',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "accounts" */
export type Accounts_Set_Input = {
  /** 账户信息，如授权后返回的头像、用户昵称等 */
  account_info?: InputMaybe<Scalars['json']['input']>;
  /** 账号提供商，可选：1.weixin_mini_program（微信小程序）2.weixin_public_account（微信公众号）3.tencent_open_platform（腾讯开放平台） */
  account_provider?: InputMaybe<Scalars['String']['input']>;
  /** 账号提供商对应的应用appid */
  account_provider_appid?: InputMaybe<Scalars['String']['input']>;
  /** 账号授权的openid */
  account_provider_openid?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Accounts_Stddev_Fields = {
  __typename?: 'accounts_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Accounts_Stddev_Pop_Fields = {
  __typename?: 'accounts_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Accounts_Stddev_Samp_Fields = {
  __typename?: 'accounts_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "accounts" */
export type Accounts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Accounts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Accounts_Stream_Cursor_Value_Input = {
  /** 账户信息，如授权后返回的头像、用户昵称等 */
  account_info?: InputMaybe<Scalars['json']['input']>;
  /** 账号提供商，可选：1.weixin_mini_program（微信小程序）2.weixin_public_account（微信公众号）3.tencent_open_platform（腾讯开放平台） */
  account_provider?: InputMaybe<Scalars['String']['input']>;
  /** 账号提供商对应的应用appid */
  account_provider_appid?: InputMaybe<Scalars['String']['input']>;
  /** 账号授权的openid */
  account_provider_openid?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Accounts_Sum_Fields = {
  __typename?: 'accounts_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "accounts" */
export enum Accounts_Update_Column {
  /** column name */
  AccountInfo = 'account_info',
  /** column name */
  AccountProvider = 'account_provider',
  /** column name */
  AccountProviderAppid = 'account_provider_appid',
  /** column name */
  AccountProviderOpenid = 'account_provider_openid',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Accounts_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Accounts_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Accounts_Set_Input>;
  /** filter the rows which have to be updated */
  where: Accounts_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Accounts_Var_Pop_Fields = {
  __typename?: 'accounts_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Accounts_Var_Samp_Fields = {
  __typename?: 'accounts_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Accounts_Variance_Fields = {
  __typename?: 'accounts_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** 楼栋房间表 */
export type Building_Rooms = {
  __typename?: 'building_rooms';
  /** An object relationship */
  building: Buildings;
  /** 外键，关联哪个楼栋 */
  building_buildings: Scalars['bigint']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** 标注房间在第几楼 */
  floor_number: Scalars['Int']['output'];
  id: Scalars['bigint']['output'];
  /** 房间名称 */
  name: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** 标注房间在哪个区域 ，如房间名称是C502，则属于C区，可不填 */
  zone?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "building_rooms" */
export type Building_Rooms_Aggregate = {
  __typename?: 'building_rooms_aggregate';
  aggregate?: Maybe<Building_Rooms_Aggregate_Fields>;
  nodes: Array<Building_Rooms>;
};

export type Building_Rooms_Aggregate_Bool_Exp = {
  count?: InputMaybe<Building_Rooms_Aggregate_Bool_Exp_Count>;
};

export type Building_Rooms_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Building_Rooms_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Building_Rooms_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "building_rooms" */
export type Building_Rooms_Aggregate_Fields = {
  __typename?: 'building_rooms_aggregate_fields';
  avg?: Maybe<Building_Rooms_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Building_Rooms_Max_Fields>;
  min?: Maybe<Building_Rooms_Min_Fields>;
  stddev?: Maybe<Building_Rooms_Stddev_Fields>;
  stddev_pop?: Maybe<Building_Rooms_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Building_Rooms_Stddev_Samp_Fields>;
  sum?: Maybe<Building_Rooms_Sum_Fields>;
  var_pop?: Maybe<Building_Rooms_Var_Pop_Fields>;
  var_samp?: Maybe<Building_Rooms_Var_Samp_Fields>;
  variance?: Maybe<Building_Rooms_Variance_Fields>;
};


/** aggregate fields of "building_rooms" */
export type Building_Rooms_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Building_Rooms_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "building_rooms" */
export type Building_Rooms_Aggregate_Order_By = {
  avg?: InputMaybe<Building_Rooms_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Building_Rooms_Max_Order_By>;
  min?: InputMaybe<Building_Rooms_Min_Order_By>;
  stddev?: InputMaybe<Building_Rooms_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Building_Rooms_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Building_Rooms_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Building_Rooms_Sum_Order_By>;
  var_pop?: InputMaybe<Building_Rooms_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Building_Rooms_Var_Samp_Order_By>;
  variance?: InputMaybe<Building_Rooms_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "building_rooms" */
export type Building_Rooms_Arr_Rel_Insert_Input = {
  data: Array<Building_Rooms_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Building_Rooms_On_Conflict>;
};

/** aggregate avg on columns */
export type Building_Rooms_Avg_Fields = {
  __typename?: 'building_rooms_avg_fields';
  /** 外键，关联哪个楼栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 标注房间在第几楼 */
  floor_number?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "building_rooms" */
export type Building_Rooms_Avg_Order_By = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Order_By>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "building_rooms". All fields are combined with a logical 'AND'. */
export type Building_Rooms_Bool_Exp = {
  _and?: InputMaybe<Array<Building_Rooms_Bool_Exp>>;
  _not?: InputMaybe<Building_Rooms_Bool_Exp>;
  _or?: InputMaybe<Array<Building_Rooms_Bool_Exp>>;
  building?: InputMaybe<Buildings_Bool_Exp>;
  building_buildings?: InputMaybe<Bigint_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  floor_number?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  zone?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "building_rooms" */
export enum Building_Rooms_Constraint {
  /** unique or primary key constraint on columns "building_buildings", "name" */
  BuildingRoomsBuildingBuildingsNameKey = 'building_rooms_building_buildings_name_key',
  /** unique or primary key constraint on columns "id" */
  BuildingRoomsPkey = 'building_rooms_pkey'
}

/** input type for incrementing numeric columns in table "building_rooms" */
export type Building_Rooms_Inc_Input = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Scalars['bigint']['input']>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "building_rooms" */
export type Building_Rooms_Insert_Input = {
  building?: InputMaybe<Buildings_Obj_Rel_Insert_Input>;
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 房间名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 标注房间在哪个区域 ，如房间名称是C502，则属于C区，可不填 */
  zone?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Building_Rooms_Max_Fields = {
  __typename?: 'building_rooms_max_fields';
  /** 外键，关联哪个楼栋 */
  building_buildings?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 标注房间在第几楼 */
  floor_number?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 房间名称 */
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 标注房间在哪个区域 ，如房间名称是C502，则属于C区，可不填 */
  zone?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "building_rooms" */
export type Building_Rooms_Max_Order_By = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 房间名称 */
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  /** 标注房间在哪个区域 ，如房间名称是C502，则属于C区，可不填 */
  zone?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Building_Rooms_Min_Fields = {
  __typename?: 'building_rooms_min_fields';
  /** 外键，关联哪个楼栋 */
  building_buildings?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 标注房间在第几楼 */
  floor_number?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 房间名称 */
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 标注房间在哪个区域 ，如房间名称是C502，则属于C区，可不填 */
  zone?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "building_rooms" */
export type Building_Rooms_Min_Order_By = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 房间名称 */
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  /** 标注房间在哪个区域 ，如房间名称是C502，则属于C区，可不填 */
  zone?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "building_rooms" */
export type Building_Rooms_Mutation_Response = {
  __typename?: 'building_rooms_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Building_Rooms>;
};

/** on_conflict condition type for table "building_rooms" */
export type Building_Rooms_On_Conflict = {
  constraint: Building_Rooms_Constraint;
  update_columns?: Array<Building_Rooms_Update_Column>;
  where?: InputMaybe<Building_Rooms_Bool_Exp>;
};

/** Ordering options when selecting data from "building_rooms". */
export type Building_Rooms_Order_By = {
  building?: InputMaybe<Buildings_Order_By>;
  building_buildings?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  floor_number?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  zone?: InputMaybe<Order_By>;
};

/** primary key columns input for table: building_rooms */
export type Building_Rooms_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "building_rooms" */
export enum Building_Rooms_Select_Column {
  /** column name */
  BuildingBuildings = 'building_buildings',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FloorNumber = 'floor_number',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Zone = 'zone'
}

/** input type for updating data in table "building_rooms" */
export type Building_Rooms_Set_Input = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 房间名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 标注房间在哪个区域 ，如房间名称是C502，则属于C区，可不填 */
  zone?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Building_Rooms_Stddev_Fields = {
  __typename?: 'building_rooms_stddev_fields';
  /** 外键，关联哪个楼栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 标注房间在第几楼 */
  floor_number?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "building_rooms" */
export type Building_Rooms_Stddev_Order_By = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Order_By>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Building_Rooms_Stddev_Pop_Fields = {
  __typename?: 'building_rooms_stddev_pop_fields';
  /** 外键，关联哪个楼栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 标注房间在第几楼 */
  floor_number?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "building_rooms" */
export type Building_Rooms_Stddev_Pop_Order_By = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Order_By>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Building_Rooms_Stddev_Samp_Fields = {
  __typename?: 'building_rooms_stddev_samp_fields';
  /** 外键，关联哪个楼栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 标注房间在第几楼 */
  floor_number?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "building_rooms" */
export type Building_Rooms_Stddev_Samp_Order_By = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Order_By>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "building_rooms" */
export type Building_Rooms_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Building_Rooms_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Building_Rooms_Stream_Cursor_Value_Input = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 房间名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 标注房间在哪个区域 ，如房间名称是C502，则属于C区，可不填 */
  zone?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Building_Rooms_Sum_Fields = {
  __typename?: 'building_rooms_sum_fields';
  /** 外键，关联哪个楼栋 */
  building_buildings?: Maybe<Scalars['bigint']['output']>;
  /** 标注房间在第几楼 */
  floor_number?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "building_rooms" */
export type Building_Rooms_Sum_Order_By = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Order_By>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** update columns of table "building_rooms" */
export enum Building_Rooms_Update_Column {
  /** column name */
  BuildingBuildings = 'building_buildings',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FloorNumber = 'floor_number',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Zone = 'zone'
}

export type Building_Rooms_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Building_Rooms_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Building_Rooms_Set_Input>;
  /** filter the rows which have to be updated */
  where: Building_Rooms_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Building_Rooms_Var_Pop_Fields = {
  __typename?: 'building_rooms_var_pop_fields';
  /** 外键，关联哪个楼栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 标注房间在第几楼 */
  floor_number?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "building_rooms" */
export type Building_Rooms_Var_Pop_Order_By = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Order_By>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Building_Rooms_Var_Samp_Fields = {
  __typename?: 'building_rooms_var_samp_fields';
  /** 外键，关联哪个楼栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 标注房间在第几楼 */
  floor_number?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "building_rooms" */
export type Building_Rooms_Var_Samp_Order_By = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Order_By>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Building_Rooms_Variance_Fields = {
  __typename?: 'building_rooms_variance_fields';
  /** 外键，关联哪个楼栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 标注房间在第几楼 */
  floor_number?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "building_rooms" */
export type Building_Rooms_Variance_Order_By = {
  /** 外键，关联哪个楼栋 */
  building_buildings?: InputMaybe<Order_By>;
  /** 标注房间在第几楼 */
  floor_number?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** 楼栋 */
export type Buildings = {
  __typename?: 'buildings';
  /** An array relationship */
  building_rooms: Array<Building_Rooms>;
  /** An aggregate relationship */
  building_rooms_aggregate: Building_Rooms_Aggregate;
  /** An object relationship */
  campus: Campuses;
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses: Scalars['bigint']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** 楼栋的类型，如 1.教学楼 2.宿舍楼 3.商业楼 等 */
  type?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamptz']['output'];
  /** 楼栋所在区域，如：品正园，可不设置 */
  zone?: Maybe<Scalars['String']['output']>;
};


/** 楼栋 */
export type BuildingsBuilding_RoomsArgs = {
  distinct_on?: InputMaybe<Array<Building_Rooms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Building_Rooms_Order_By>>;
  where?: InputMaybe<Building_Rooms_Bool_Exp>;
};


/** 楼栋 */
export type BuildingsBuilding_Rooms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Building_Rooms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Building_Rooms_Order_By>>;
  where?: InputMaybe<Building_Rooms_Bool_Exp>;
};

/** aggregated selection of "buildings" */
export type Buildings_Aggregate = {
  __typename?: 'buildings_aggregate';
  aggregate?: Maybe<Buildings_Aggregate_Fields>;
  nodes: Array<Buildings>;
};

export type Buildings_Aggregate_Bool_Exp = {
  count?: InputMaybe<Buildings_Aggregate_Bool_Exp_Count>;
};

export type Buildings_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Buildings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Buildings_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "buildings" */
export type Buildings_Aggregate_Fields = {
  __typename?: 'buildings_aggregate_fields';
  avg?: Maybe<Buildings_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Buildings_Max_Fields>;
  min?: Maybe<Buildings_Min_Fields>;
  stddev?: Maybe<Buildings_Stddev_Fields>;
  stddev_pop?: Maybe<Buildings_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Buildings_Stddev_Samp_Fields>;
  sum?: Maybe<Buildings_Sum_Fields>;
  var_pop?: Maybe<Buildings_Var_Pop_Fields>;
  var_samp?: Maybe<Buildings_Var_Samp_Fields>;
  variance?: Maybe<Buildings_Variance_Fields>;
};


/** aggregate fields of "buildings" */
export type Buildings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Buildings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "buildings" */
export type Buildings_Aggregate_Order_By = {
  avg?: InputMaybe<Buildings_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Buildings_Max_Order_By>;
  min?: InputMaybe<Buildings_Min_Order_By>;
  stddev?: InputMaybe<Buildings_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Buildings_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Buildings_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Buildings_Sum_Order_By>;
  var_pop?: InputMaybe<Buildings_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Buildings_Var_Samp_Order_By>;
  variance?: InputMaybe<Buildings_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "buildings" */
export type Buildings_Arr_Rel_Insert_Input = {
  data: Array<Buildings_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Buildings_On_Conflict>;
};

/** aggregate avg on columns */
export type Buildings_Avg_Fields = {
  __typename?: 'buildings_avg_fields';
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "buildings" */
export type Buildings_Avg_Order_By = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "buildings". All fields are combined with a logical 'AND'. */
export type Buildings_Bool_Exp = {
  _and?: InputMaybe<Array<Buildings_Bool_Exp>>;
  _not?: InputMaybe<Buildings_Bool_Exp>;
  _or?: InputMaybe<Array<Buildings_Bool_Exp>>;
  building_rooms?: InputMaybe<Building_Rooms_Bool_Exp>;
  building_rooms_aggregate?: InputMaybe<Building_Rooms_Aggregate_Bool_Exp>;
  campus?: InputMaybe<Campuses_Bool_Exp>;
  campus_campuses?: InputMaybe<Bigint_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  zone?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "buildings" */
export enum Buildings_Constraint {
  /** unique or primary key constraint on columns "id" */
  BuildingsPkey = 'buildings_pkey'
}

/** input type for incrementing numeric columns in table "buildings" */
export type Buildings_Inc_Input = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Scalars['bigint']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "buildings" */
export type Buildings_Insert_Input = {
  building_rooms?: InputMaybe<Building_Rooms_Arr_Rel_Insert_Input>;
  campus?: InputMaybe<Campuses_Obj_Rel_Insert_Input>;
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 楼栋的类型，如 1.教学楼 2.宿舍楼 3.商业楼 等 */
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 楼栋所在区域，如：品正园，可不设置 */
  zone?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Buildings_Max_Fields = {
  __typename?: 'buildings_max_fields';
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 楼栋的类型，如 1.教学楼 2.宿舍楼 3.商业楼 等 */
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 楼栋所在区域，如：品正园，可不设置 */
  zone?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "buildings" */
export type Buildings_Max_Order_By = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 楼栋的类型，如 1.教学楼 2.宿舍楼 3.商业楼 等 */
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  /** 楼栋所在区域，如：品正园，可不设置 */
  zone?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Buildings_Min_Fields = {
  __typename?: 'buildings_min_fields';
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 楼栋的类型，如 1.教学楼 2.宿舍楼 3.商业楼 等 */
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 楼栋所在区域，如：品正园，可不设置 */
  zone?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "buildings" */
export type Buildings_Min_Order_By = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 楼栋的类型，如 1.教学楼 2.宿舍楼 3.商业楼 等 */
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  /** 楼栋所在区域，如：品正园，可不设置 */
  zone?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "buildings" */
export type Buildings_Mutation_Response = {
  __typename?: 'buildings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Buildings>;
};

/** input type for inserting object relation for remote table "buildings" */
export type Buildings_Obj_Rel_Insert_Input = {
  data: Buildings_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Buildings_On_Conflict>;
};

/** on_conflict condition type for table "buildings" */
export type Buildings_On_Conflict = {
  constraint: Buildings_Constraint;
  update_columns?: Array<Buildings_Update_Column>;
  where?: InputMaybe<Buildings_Bool_Exp>;
};

/** Ordering options when selecting data from "buildings". */
export type Buildings_Order_By = {
  building_rooms_aggregate?: InputMaybe<Building_Rooms_Aggregate_Order_By>;
  campus?: InputMaybe<Campuses_Order_By>;
  campus_campuses?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  zone?: InputMaybe<Order_By>;
};

/** primary key columns input for table: buildings */
export type Buildings_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "buildings" */
export enum Buildings_Select_Column {
  /** column name */
  CampusCampuses = 'campus_campuses',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Zone = 'zone'
}

/** input type for updating data in table "buildings" */
export type Buildings_Set_Input = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 楼栋的类型，如 1.教学楼 2.宿舍楼 3.商业楼 等 */
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 楼栋所在区域，如：品正园，可不设置 */
  zone?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Buildings_Stddev_Fields = {
  __typename?: 'buildings_stddev_fields';
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "buildings" */
export type Buildings_Stddev_Order_By = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Buildings_Stddev_Pop_Fields = {
  __typename?: 'buildings_stddev_pop_fields';
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "buildings" */
export type Buildings_Stddev_Pop_Order_By = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Buildings_Stddev_Samp_Fields = {
  __typename?: 'buildings_stddev_samp_fields';
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "buildings" */
export type Buildings_Stddev_Samp_Order_By = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "buildings" */
export type Buildings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Buildings_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Buildings_Stream_Cursor_Value_Input = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 楼栋的类型，如 1.教学楼 2.宿舍楼 3.商业楼 等 */
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 楼栋所在区域，如：品正园，可不设置 */
  zone?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Buildings_Sum_Fields = {
  __typename?: 'buildings_sum_fields';
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "buildings" */
export type Buildings_Sum_Order_By = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** update columns of table "buildings" */
export enum Buildings_Update_Column {
  /** column name */
  CampusCampuses = 'campus_campuses',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Zone = 'zone'
}

export type Buildings_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Buildings_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Buildings_Set_Input>;
  /** filter the rows which have to be updated */
  where: Buildings_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Buildings_Var_Pop_Fields = {
  __typename?: 'buildings_var_pop_fields';
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "buildings" */
export type Buildings_Var_Pop_Order_By = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Buildings_Var_Samp_Fields = {
  __typename?: 'buildings_var_samp_fields';
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "buildings" */
export type Buildings_Var_Samp_Order_By = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Buildings_Variance_Fields = {
  __typename?: 'buildings_variance_fields';
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "buildings" */
export type Buildings_Variance_Order_By = {
  /** 关联外键，哪个学校的楼栋 */
  campus_campuses?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** 校园表 */
export type Campuses = {
  __typename?: 'campuses';
  /** An array relationship */
  buildings: Array<Buildings>;
  /** An aggregate relationship */
  buildings_aggregate: Buildings_Aggregate;
  city?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamptz']['output'];
  district?: Maybe<Scalars['String']['output']>;
  id: Scalars['bigint']['output'];
  /** 学校名称 */
  name: Scalars['String']['output'];
  province?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamptz']['output'];
};


/** 校园表 */
export type CampusesBuildingsArgs = {
  distinct_on?: InputMaybe<Array<Buildings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Buildings_Order_By>>;
  where?: InputMaybe<Buildings_Bool_Exp>;
};


/** 校园表 */
export type CampusesBuildings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Buildings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Buildings_Order_By>>;
  where?: InputMaybe<Buildings_Bool_Exp>;
};

/** aggregated selection of "campuses" */
export type Campuses_Aggregate = {
  __typename?: 'campuses_aggregate';
  aggregate?: Maybe<Campuses_Aggregate_Fields>;
  nodes: Array<Campuses>;
};

/** aggregate fields of "campuses" */
export type Campuses_Aggregate_Fields = {
  __typename?: 'campuses_aggregate_fields';
  avg?: Maybe<Campuses_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Campuses_Max_Fields>;
  min?: Maybe<Campuses_Min_Fields>;
  stddev?: Maybe<Campuses_Stddev_Fields>;
  stddev_pop?: Maybe<Campuses_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Campuses_Stddev_Samp_Fields>;
  sum?: Maybe<Campuses_Sum_Fields>;
  var_pop?: Maybe<Campuses_Var_Pop_Fields>;
  var_samp?: Maybe<Campuses_Var_Samp_Fields>;
  variance?: Maybe<Campuses_Variance_Fields>;
};


/** aggregate fields of "campuses" */
export type Campuses_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Campuses_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Campuses_Avg_Fields = {
  __typename?: 'campuses_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "campuses". All fields are combined with a logical 'AND'. */
export type Campuses_Bool_Exp = {
  _and?: InputMaybe<Array<Campuses_Bool_Exp>>;
  _not?: InputMaybe<Campuses_Bool_Exp>;
  _or?: InputMaybe<Array<Campuses_Bool_Exp>>;
  buildings?: InputMaybe<Buildings_Bool_Exp>;
  buildings_aggregate?: InputMaybe<Buildings_Aggregate_Bool_Exp>;
  city?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  district?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  province?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "campuses" */
export enum Campuses_Constraint {
  /** unique or primary key constraint on columns "name" */
  CampusesNameKey = 'campuses_name_key',
  /** unique or primary key constraint on columns "id" */
  CampusesPkey = 'campuses_pkey'
}

/** input type for incrementing numeric columns in table "campuses" */
export type Campuses_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "campuses" */
export type Campuses_Insert_Input = {
  buildings?: InputMaybe<Buildings_Arr_Rel_Insert_Input>;
  city?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 学校名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Campuses_Max_Fields = {
  __typename?: 'campuses_max_fields';
  city?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 学校名称 */
  name?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Campuses_Min_Fields = {
  __typename?: 'campuses_min_fields';
  city?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 学校名称 */
  name?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "campuses" */
export type Campuses_Mutation_Response = {
  __typename?: 'campuses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Campuses>;
};

/** input type for inserting object relation for remote table "campuses" */
export type Campuses_Obj_Rel_Insert_Input = {
  data: Campuses_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Campuses_On_Conflict>;
};

/** on_conflict condition type for table "campuses" */
export type Campuses_On_Conflict = {
  constraint: Campuses_Constraint;
  update_columns?: Array<Campuses_Update_Column>;
  where?: InputMaybe<Campuses_Bool_Exp>;
};

/** Ordering options when selecting data from "campuses". */
export type Campuses_Order_By = {
  buildings_aggregate?: InputMaybe<Buildings_Aggregate_Order_By>;
  city?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  district?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  province?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: campuses */
export type Campuses_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "campuses" */
export enum Campuses_Select_Column {
  /** column name */
  City = 'city',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  District = 'district',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Province = 'province',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "campuses" */
export type Campuses_Set_Input = {
  city?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 学校名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Campuses_Stddev_Fields = {
  __typename?: 'campuses_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Campuses_Stddev_Pop_Fields = {
  __typename?: 'campuses_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Campuses_Stddev_Samp_Fields = {
  __typename?: 'campuses_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "campuses" */
export type Campuses_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Campuses_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Campuses_Stream_Cursor_Value_Input = {
  city?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 学校名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Campuses_Sum_Fields = {
  __typename?: 'campuses_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "campuses" */
export enum Campuses_Update_Column {
  /** column name */
  City = 'city',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  District = 'district',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Province = 'province',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Campuses_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Campuses_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Campuses_Set_Input>;
  /** filter the rows which have to be updated */
  where: Campuses_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Campuses_Var_Pop_Fields = {
  __typename?: 'campuses_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Campuses_Var_Samp_Fields = {
  __typename?: 'campuses_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Campuses_Variance_Fields = {
  __typename?: 'campuses_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']['input']>;
  _gt?: InputMaybe<Scalars['json']['input']>;
  _gte?: InputMaybe<Scalars['json']['input']>;
  _in?: InputMaybe<Array<Scalars['json']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['json']['input']>;
  _lte?: InputMaybe<Scalars['json']['input']>;
  _neq?: InputMaybe<Scalars['json']['input']>;
  _nin?: InputMaybe<Array<Scalars['json']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "accounts" */
  delete_accounts?: Maybe<Accounts_Mutation_Response>;
  /** delete single row from the table: "accounts" */
  delete_accounts_by_pk?: Maybe<Accounts>;
  /** delete data from the table: "building_rooms" */
  delete_building_rooms?: Maybe<Building_Rooms_Mutation_Response>;
  /** delete single row from the table: "building_rooms" */
  delete_building_rooms_by_pk?: Maybe<Building_Rooms>;
  /** delete data from the table: "buildings" */
  delete_buildings?: Maybe<Buildings_Mutation_Response>;
  /** delete single row from the table: "buildings" */
  delete_buildings_by_pk?: Maybe<Buildings>;
  /** delete data from the table: "campuses" */
  delete_campuses?: Maybe<Campuses_Mutation_Response>;
  /** delete single row from the table: "campuses" */
  delete_campuses_by_pk?: Maybe<Campuses>;
  /** delete data from the table: "product_skus" */
  delete_product_skus?: Maybe<Product_Skus_Mutation_Response>;
  /** delete single row from the table: "product_skus" */
  delete_product_skus_by_pk?: Maybe<Product_Skus>;
  /** delete data from the table: "products" */
  delete_products?: Maybe<Products_Mutation_Response>;
  /** delete single row from the table: "products" */
  delete_products_by_pk?: Maybe<Products>;
  /** delete data from the table: "shop_carts" */
  delete_shop_carts?: Maybe<Shop_Carts_Mutation_Response>;
  /** delete single row from the table: "shop_carts" */
  delete_shop_carts_by_pk?: Maybe<Shop_Carts>;
  /** delete data from the table: "shop_order_items" */
  delete_shop_order_items?: Maybe<Shop_Order_Items_Mutation_Response>;
  /** delete single row from the table: "shop_order_items" */
  delete_shop_order_items_by_pk?: Maybe<Shop_Order_Items>;
  /** delete data from the table: "shop_orders" */
  delete_shop_orders?: Maybe<Shop_Orders_Mutation_Response>;
  /** delete single row from the table: "shop_orders" */
  delete_shop_orders_by_pk?: Maybe<Shop_Orders>;
  /** delete data from the table: "shop_userorders" */
  delete_shop_userorders?: Maybe<Shop_Userorders_Mutation_Response>;
  /** delete single row from the table: "shop_userorders" */
  delete_shop_userorders_by_pk?: Maybe<Shop_Userorders>;
  /** delete data from the table: "shop_users" */
  delete_shop_users?: Maybe<Shop_Users_Mutation_Response>;
  /** delete single row from the table: "shop_users" */
  delete_shop_users_by_pk?: Maybe<Shop_Users>;
  /** delete data from the table: "shops" */
  delete_shops?: Maybe<Shops_Mutation_Response>;
  /** delete single row from the table: "shops" */
  delete_shops_by_pk?: Maybe<Shops>;
  /** delete data from the table: "user_accounts" */
  delete_user_accounts?: Maybe<User_Accounts_Mutation_Response>;
  /** delete single row from the table: "user_accounts" */
  delete_user_accounts_by_pk?: Maybe<User_Accounts>;
  /** delete data from the table: "user_addresses" */
  delete_user_addresses?: Maybe<User_Addresses_Mutation_Response>;
  /** delete single row from the table: "user_addresses" */
  delete_user_addresses_by_pk?: Maybe<User_Addresses>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "accounts" */
  insert_accounts?: Maybe<Accounts_Mutation_Response>;
  /** insert a single row into the table: "accounts" */
  insert_accounts_one?: Maybe<Accounts>;
  /** insert data into the table: "building_rooms" */
  insert_building_rooms?: Maybe<Building_Rooms_Mutation_Response>;
  /** insert a single row into the table: "building_rooms" */
  insert_building_rooms_one?: Maybe<Building_Rooms>;
  /** insert data into the table: "buildings" */
  insert_buildings?: Maybe<Buildings_Mutation_Response>;
  /** insert a single row into the table: "buildings" */
  insert_buildings_one?: Maybe<Buildings>;
  /** insert data into the table: "campuses" */
  insert_campuses?: Maybe<Campuses_Mutation_Response>;
  /** insert a single row into the table: "campuses" */
  insert_campuses_one?: Maybe<Campuses>;
  /** insert data into the table: "product_skus" */
  insert_product_skus?: Maybe<Product_Skus_Mutation_Response>;
  /** insert a single row into the table: "product_skus" */
  insert_product_skus_one?: Maybe<Product_Skus>;
  /** insert data into the table: "products" */
  insert_products?: Maybe<Products_Mutation_Response>;
  /** insert a single row into the table: "products" */
  insert_products_one?: Maybe<Products>;
  /** insert data into the table: "shop_carts" */
  insert_shop_carts?: Maybe<Shop_Carts_Mutation_Response>;
  /** insert a single row into the table: "shop_carts" */
  insert_shop_carts_one?: Maybe<Shop_Carts>;
  /** insert data into the table: "shop_order_items" */
  insert_shop_order_items?: Maybe<Shop_Order_Items_Mutation_Response>;
  /** insert a single row into the table: "shop_order_items" */
  insert_shop_order_items_one?: Maybe<Shop_Order_Items>;
  /** insert data into the table: "shop_orders" */
  insert_shop_orders?: Maybe<Shop_Orders_Mutation_Response>;
  /** insert a single row into the table: "shop_orders" */
  insert_shop_orders_one?: Maybe<Shop_Orders>;
  /** insert data into the table: "shop_userorders" */
  insert_shop_userorders?: Maybe<Shop_Userorders_Mutation_Response>;
  /** insert a single row into the table: "shop_userorders" */
  insert_shop_userorders_one?: Maybe<Shop_Userorders>;
  /** insert data into the table: "shop_users" */
  insert_shop_users?: Maybe<Shop_Users_Mutation_Response>;
  /** insert a single row into the table: "shop_users" */
  insert_shop_users_one?: Maybe<Shop_Users>;
  /** insert data into the table: "shops" */
  insert_shops?: Maybe<Shops_Mutation_Response>;
  /** insert a single row into the table: "shops" */
  insert_shops_one?: Maybe<Shops>;
  /** insert data into the table: "user_accounts" */
  insert_user_accounts?: Maybe<User_Accounts_Mutation_Response>;
  /** insert a single row into the table: "user_accounts" */
  insert_user_accounts_one?: Maybe<User_Accounts>;
  /** insert data into the table: "user_addresses" */
  insert_user_addresses?: Maybe<User_Addresses_Mutation_Response>;
  /** insert a single row into the table: "user_addresses" */
  insert_user_addresses_one?: Maybe<User_Addresses>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "accounts" */
  update_accounts?: Maybe<Accounts_Mutation_Response>;
  /** update single row of the table: "accounts" */
  update_accounts_by_pk?: Maybe<Accounts>;
  /** update multiples rows of table: "accounts" */
  update_accounts_many?: Maybe<Array<Maybe<Accounts_Mutation_Response>>>;
  /** update data of the table: "building_rooms" */
  update_building_rooms?: Maybe<Building_Rooms_Mutation_Response>;
  /** update single row of the table: "building_rooms" */
  update_building_rooms_by_pk?: Maybe<Building_Rooms>;
  /** update multiples rows of table: "building_rooms" */
  update_building_rooms_many?: Maybe<Array<Maybe<Building_Rooms_Mutation_Response>>>;
  /** update data of the table: "buildings" */
  update_buildings?: Maybe<Buildings_Mutation_Response>;
  /** update single row of the table: "buildings" */
  update_buildings_by_pk?: Maybe<Buildings>;
  /** update multiples rows of table: "buildings" */
  update_buildings_many?: Maybe<Array<Maybe<Buildings_Mutation_Response>>>;
  /** update data of the table: "campuses" */
  update_campuses?: Maybe<Campuses_Mutation_Response>;
  /** update single row of the table: "campuses" */
  update_campuses_by_pk?: Maybe<Campuses>;
  /** update multiples rows of table: "campuses" */
  update_campuses_many?: Maybe<Array<Maybe<Campuses_Mutation_Response>>>;
  /** update data of the table: "product_skus" */
  update_product_skus?: Maybe<Product_Skus_Mutation_Response>;
  /** update single row of the table: "product_skus" */
  update_product_skus_by_pk?: Maybe<Product_Skus>;
  /** update multiples rows of table: "product_skus" */
  update_product_skus_many?: Maybe<Array<Maybe<Product_Skus_Mutation_Response>>>;
  /** update data of the table: "products" */
  update_products?: Maybe<Products_Mutation_Response>;
  /** update single row of the table: "products" */
  update_products_by_pk?: Maybe<Products>;
  /** update multiples rows of table: "products" */
  update_products_many?: Maybe<Array<Maybe<Products_Mutation_Response>>>;
  /** update data of the table: "shop_carts" */
  update_shop_carts?: Maybe<Shop_Carts_Mutation_Response>;
  /** update single row of the table: "shop_carts" */
  update_shop_carts_by_pk?: Maybe<Shop_Carts>;
  /** update multiples rows of table: "shop_carts" */
  update_shop_carts_many?: Maybe<Array<Maybe<Shop_Carts_Mutation_Response>>>;
  /** update data of the table: "shop_order_items" */
  update_shop_order_items?: Maybe<Shop_Order_Items_Mutation_Response>;
  /** update single row of the table: "shop_order_items" */
  update_shop_order_items_by_pk?: Maybe<Shop_Order_Items>;
  /** update multiples rows of table: "shop_order_items" */
  update_shop_order_items_many?: Maybe<Array<Maybe<Shop_Order_Items_Mutation_Response>>>;
  /** update data of the table: "shop_orders" */
  update_shop_orders?: Maybe<Shop_Orders_Mutation_Response>;
  /** update single row of the table: "shop_orders" */
  update_shop_orders_by_pk?: Maybe<Shop_Orders>;
  /** update multiples rows of table: "shop_orders" */
  update_shop_orders_many?: Maybe<Array<Maybe<Shop_Orders_Mutation_Response>>>;
  /** update data of the table: "shop_userorders" */
  update_shop_userorders?: Maybe<Shop_Userorders_Mutation_Response>;
  /** update single row of the table: "shop_userorders" */
  update_shop_userorders_by_pk?: Maybe<Shop_Userorders>;
  /** update multiples rows of table: "shop_userorders" */
  update_shop_userorders_many?: Maybe<Array<Maybe<Shop_Userorders_Mutation_Response>>>;
  /** update data of the table: "shop_users" */
  update_shop_users?: Maybe<Shop_Users_Mutation_Response>;
  /** update single row of the table: "shop_users" */
  update_shop_users_by_pk?: Maybe<Shop_Users>;
  /** update multiples rows of table: "shop_users" */
  update_shop_users_many?: Maybe<Array<Maybe<Shop_Users_Mutation_Response>>>;
  /** update data of the table: "shops" */
  update_shops?: Maybe<Shops_Mutation_Response>;
  /** update single row of the table: "shops" */
  update_shops_by_pk?: Maybe<Shops>;
  /** update multiples rows of table: "shops" */
  update_shops_many?: Maybe<Array<Maybe<Shops_Mutation_Response>>>;
  /** update data of the table: "user_accounts" */
  update_user_accounts?: Maybe<User_Accounts_Mutation_Response>;
  /** update single row of the table: "user_accounts" */
  update_user_accounts_by_pk?: Maybe<User_Accounts>;
  /** update multiples rows of table: "user_accounts" */
  update_user_accounts_many?: Maybe<Array<Maybe<User_Accounts_Mutation_Response>>>;
  /** update data of the table: "user_addresses" */
  update_user_addresses?: Maybe<User_Addresses_Mutation_Response>;
  /** update single row of the table: "user_addresses" */
  update_user_addresses_by_pk?: Maybe<User_Addresses>;
  /** update multiples rows of table: "user_addresses" */
  update_user_addresses_many?: Maybe<Array<Maybe<User_Addresses_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_AccountsArgs = {
  where: Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Accounts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Building_RoomsArgs = {
  where: Building_Rooms_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Building_Rooms_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_BuildingsArgs = {
  where: Buildings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Buildings_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_CampusesArgs = {
  where: Campuses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Campuses_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Product_SkusArgs = {
  where: Product_Skus_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Skus_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Products_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Shop_CartsArgs = {
  where: Shop_Carts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Shop_Carts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Shop_Order_ItemsArgs = {
  where: Shop_Order_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Shop_Order_Items_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Shop_OrdersArgs = {
  where: Shop_Orders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Shop_Orders_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Shop_UserordersArgs = {
  where: Shop_Userorders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Shop_Userorders_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Shop_UsersArgs = {
  where: Shop_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Shop_Users_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ShopsArgs = {
  where: Shops_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Shops_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_AccountsArgs = {
  where: User_Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Accounts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_AddressesArgs = {
  where: User_Addresses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Addresses_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootInsert_AccountsArgs = {
  objects: Array<Accounts_Insert_Input>;
  on_conflict?: InputMaybe<Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Accounts_OneArgs = {
  object: Accounts_Insert_Input;
  on_conflict?: InputMaybe<Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Building_RoomsArgs = {
  objects: Array<Building_Rooms_Insert_Input>;
  on_conflict?: InputMaybe<Building_Rooms_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Building_Rooms_OneArgs = {
  object: Building_Rooms_Insert_Input;
  on_conflict?: InputMaybe<Building_Rooms_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BuildingsArgs = {
  objects: Array<Buildings_Insert_Input>;
  on_conflict?: InputMaybe<Buildings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Buildings_OneArgs = {
  object: Buildings_Insert_Input;
  on_conflict?: InputMaybe<Buildings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CampusesArgs = {
  objects: Array<Campuses_Insert_Input>;
  on_conflict?: InputMaybe<Campuses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Campuses_OneArgs = {
  object: Campuses_Insert_Input;
  on_conflict?: InputMaybe<Campuses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_SkusArgs = {
  objects: Array<Product_Skus_Insert_Input>;
  on_conflict?: InputMaybe<Product_Skus_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Skus_OneArgs = {
  object: Product_Skus_Insert_Input;
  on_conflict?: InputMaybe<Product_Skus_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProductsArgs = {
  objects: Array<Products_Insert_Input>;
  on_conflict?: InputMaybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_OneArgs = {
  object: Products_Insert_Input;
  on_conflict?: InputMaybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shop_CartsArgs = {
  objects: Array<Shop_Carts_Insert_Input>;
  on_conflict?: InputMaybe<Shop_Carts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shop_Carts_OneArgs = {
  object: Shop_Carts_Insert_Input;
  on_conflict?: InputMaybe<Shop_Carts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shop_Order_ItemsArgs = {
  objects: Array<Shop_Order_Items_Insert_Input>;
  on_conflict?: InputMaybe<Shop_Order_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shop_Order_Items_OneArgs = {
  object: Shop_Order_Items_Insert_Input;
  on_conflict?: InputMaybe<Shop_Order_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shop_OrdersArgs = {
  objects: Array<Shop_Orders_Insert_Input>;
  on_conflict?: InputMaybe<Shop_Orders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shop_Orders_OneArgs = {
  object: Shop_Orders_Insert_Input;
  on_conflict?: InputMaybe<Shop_Orders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shop_UserordersArgs = {
  objects: Array<Shop_Userorders_Insert_Input>;
  on_conflict?: InputMaybe<Shop_Userorders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shop_Userorders_OneArgs = {
  object: Shop_Userorders_Insert_Input;
  on_conflict?: InputMaybe<Shop_Userorders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shop_UsersArgs = {
  objects: Array<Shop_Users_Insert_Input>;
  on_conflict?: InputMaybe<Shop_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shop_Users_OneArgs = {
  object: Shop_Users_Insert_Input;
  on_conflict?: InputMaybe<Shop_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ShopsArgs = {
  objects: Array<Shops_Insert_Input>;
  on_conflict?: InputMaybe<Shops_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shops_OneArgs = {
  object: Shops_Insert_Input;
  on_conflict?: InputMaybe<Shops_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_AccountsArgs = {
  objects: Array<User_Accounts_Insert_Input>;
  on_conflict?: InputMaybe<User_Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Accounts_OneArgs = {
  object: User_Accounts_Insert_Input;
  on_conflict?: InputMaybe<User_Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_AddressesArgs = {
  objects: Array<User_Addresses_Insert_Input>;
  on_conflict?: InputMaybe<User_Addresses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Addresses_OneArgs = {
  object: User_Addresses_Insert_Input;
  on_conflict?: InputMaybe<User_Addresses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AccountsArgs = {
  _inc?: InputMaybe<Accounts_Inc_Input>;
  _set?: InputMaybe<Accounts_Set_Input>;
  where: Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Accounts_By_PkArgs = {
  _inc?: InputMaybe<Accounts_Inc_Input>;
  _set?: InputMaybe<Accounts_Set_Input>;
  pk_columns: Accounts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Accounts_ManyArgs = {
  updates: Array<Accounts_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Building_RoomsArgs = {
  _inc?: InputMaybe<Building_Rooms_Inc_Input>;
  _set?: InputMaybe<Building_Rooms_Set_Input>;
  where: Building_Rooms_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Building_Rooms_By_PkArgs = {
  _inc?: InputMaybe<Building_Rooms_Inc_Input>;
  _set?: InputMaybe<Building_Rooms_Set_Input>;
  pk_columns: Building_Rooms_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Building_Rooms_ManyArgs = {
  updates: Array<Building_Rooms_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_BuildingsArgs = {
  _inc?: InputMaybe<Buildings_Inc_Input>;
  _set?: InputMaybe<Buildings_Set_Input>;
  where: Buildings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Buildings_By_PkArgs = {
  _inc?: InputMaybe<Buildings_Inc_Input>;
  _set?: InputMaybe<Buildings_Set_Input>;
  pk_columns: Buildings_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Buildings_ManyArgs = {
  updates: Array<Buildings_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_CampusesArgs = {
  _inc?: InputMaybe<Campuses_Inc_Input>;
  _set?: InputMaybe<Campuses_Set_Input>;
  where: Campuses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Campuses_By_PkArgs = {
  _inc?: InputMaybe<Campuses_Inc_Input>;
  _set?: InputMaybe<Campuses_Set_Input>;
  pk_columns: Campuses_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Campuses_ManyArgs = {
  updates: Array<Campuses_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Product_SkusArgs = {
  _inc?: InputMaybe<Product_Skus_Inc_Input>;
  _set?: InputMaybe<Product_Skus_Set_Input>;
  where: Product_Skus_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Skus_By_PkArgs = {
  _inc?: InputMaybe<Product_Skus_Inc_Input>;
  _set?: InputMaybe<Product_Skus_Set_Input>;
  pk_columns: Product_Skus_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Skus_ManyArgs = {
  updates: Array<Product_Skus_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ProductsArgs = {
  _inc?: InputMaybe<Products_Inc_Input>;
  _set?: InputMaybe<Products_Set_Input>;
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Products_By_PkArgs = {
  _inc?: InputMaybe<Products_Inc_Input>;
  _set?: InputMaybe<Products_Set_Input>;
  pk_columns: Products_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Products_ManyArgs = {
  updates: Array<Products_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_CartsArgs = {
  _inc?: InputMaybe<Shop_Carts_Inc_Input>;
  _set?: InputMaybe<Shop_Carts_Set_Input>;
  where: Shop_Carts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_Carts_By_PkArgs = {
  _inc?: InputMaybe<Shop_Carts_Inc_Input>;
  _set?: InputMaybe<Shop_Carts_Set_Input>;
  pk_columns: Shop_Carts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_Carts_ManyArgs = {
  updates: Array<Shop_Carts_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_Order_ItemsArgs = {
  _inc?: InputMaybe<Shop_Order_Items_Inc_Input>;
  _set?: InputMaybe<Shop_Order_Items_Set_Input>;
  where: Shop_Order_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_Order_Items_By_PkArgs = {
  _inc?: InputMaybe<Shop_Order_Items_Inc_Input>;
  _set?: InputMaybe<Shop_Order_Items_Set_Input>;
  pk_columns: Shop_Order_Items_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_Order_Items_ManyArgs = {
  updates: Array<Shop_Order_Items_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_OrdersArgs = {
  _inc?: InputMaybe<Shop_Orders_Inc_Input>;
  _set?: InputMaybe<Shop_Orders_Set_Input>;
  where: Shop_Orders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_Orders_By_PkArgs = {
  _inc?: InputMaybe<Shop_Orders_Inc_Input>;
  _set?: InputMaybe<Shop_Orders_Set_Input>;
  pk_columns: Shop_Orders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_Orders_ManyArgs = {
  updates: Array<Shop_Orders_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_UserordersArgs = {
  _inc?: InputMaybe<Shop_Userorders_Inc_Input>;
  _set?: InputMaybe<Shop_Userorders_Set_Input>;
  where: Shop_Userorders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_Userorders_By_PkArgs = {
  _inc?: InputMaybe<Shop_Userorders_Inc_Input>;
  _set?: InputMaybe<Shop_Userorders_Set_Input>;
  pk_columns: Shop_Userorders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_Userorders_ManyArgs = {
  updates: Array<Shop_Userorders_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_UsersArgs = {
  _inc?: InputMaybe<Shop_Users_Inc_Input>;
  _set?: InputMaybe<Shop_Users_Set_Input>;
  where: Shop_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_Users_By_PkArgs = {
  _inc?: InputMaybe<Shop_Users_Inc_Input>;
  _set?: InputMaybe<Shop_Users_Set_Input>;
  pk_columns: Shop_Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Shop_Users_ManyArgs = {
  updates: Array<Shop_Users_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ShopsArgs = {
  _inc?: InputMaybe<Shops_Inc_Input>;
  _set?: InputMaybe<Shops_Set_Input>;
  where: Shops_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Shops_By_PkArgs = {
  _inc?: InputMaybe<Shops_Inc_Input>;
  _set?: InputMaybe<Shops_Set_Input>;
  pk_columns: Shops_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Shops_ManyArgs = {
  updates: Array<Shops_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_AccountsArgs = {
  _inc?: InputMaybe<User_Accounts_Inc_Input>;
  _set?: InputMaybe<User_Accounts_Set_Input>;
  where: User_Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Accounts_By_PkArgs = {
  _inc?: InputMaybe<User_Accounts_Inc_Input>;
  _set?: InputMaybe<User_Accounts_Set_Input>;
  pk_columns: User_Accounts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Accounts_ManyArgs = {
  updates: Array<User_Accounts_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_AddressesArgs = {
  _inc?: InputMaybe<User_Addresses_Inc_Input>;
  _set?: InputMaybe<User_Addresses_Set_Input>;
  where: User_Addresses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Addresses_By_PkArgs = {
  _inc?: InputMaybe<User_Addresses_Inc_Input>;
  _set?: InputMaybe<User_Addresses_Set_Input>;
  pk_columns: User_Addresses_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Addresses_ManyArgs = {
  updates: Array<User_Addresses_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** 产品sku */
export type Product_Skus = {
  __typename?: 'product_skus';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** 规格图片url */
  image_url?: Maybe<Scalars['String']['output']>;
  /** 是否下架（下架后将不会展示给客户） */
  is_shelved: Scalars['Boolean']['output'];
  /** 规格名称 */
  name: Scalars['String']['output'];
  /** 价格，单位元 */
  price: Scalars['numeric']['output'];
  /** An object relationship */
  product: Products;
  /** 关联外建，哪个产品 */
  product_products: Scalars['bigint']['output'];
  /** An array relationship */
  shop_order_items: Array<Shop_Order_Items>;
  /** An aggregate relationship */
  shop_order_items_aggregate: Shop_Order_Items_Aggregate;
  /** 排序，越大在越前面 */
  sort_order: Scalars['bigint']['output'];
  /** 库存 */
  stock: Scalars['bigint']['output'];
  updated_at: Scalars['timestamptz']['output'];
};


/** 产品sku */
export type Product_SkusShop_Order_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Shop_Order_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Order_Items_Order_By>>;
  where?: InputMaybe<Shop_Order_Items_Bool_Exp>;
};


/** 产品sku */
export type Product_SkusShop_Order_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Order_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Order_Items_Order_By>>;
  where?: InputMaybe<Shop_Order_Items_Bool_Exp>;
};

/** aggregated selection of "product_skus" */
export type Product_Skus_Aggregate = {
  __typename?: 'product_skus_aggregate';
  aggregate?: Maybe<Product_Skus_Aggregate_Fields>;
  nodes: Array<Product_Skus>;
};

export type Product_Skus_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Product_Skus_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Product_Skus_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Product_Skus_Aggregate_Bool_Exp_Count>;
};

export type Product_Skus_Aggregate_Bool_Exp_Bool_And = {
  arguments: Product_Skus_Select_Column_Product_Skus_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Product_Skus_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Product_Skus_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Product_Skus_Select_Column_Product_Skus_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Product_Skus_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Product_Skus_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Product_Skus_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Product_Skus_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "product_skus" */
export type Product_Skus_Aggregate_Fields = {
  __typename?: 'product_skus_aggregate_fields';
  avg?: Maybe<Product_Skus_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Product_Skus_Max_Fields>;
  min?: Maybe<Product_Skus_Min_Fields>;
  stddev?: Maybe<Product_Skus_Stddev_Fields>;
  stddev_pop?: Maybe<Product_Skus_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Product_Skus_Stddev_Samp_Fields>;
  sum?: Maybe<Product_Skus_Sum_Fields>;
  var_pop?: Maybe<Product_Skus_Var_Pop_Fields>;
  var_samp?: Maybe<Product_Skus_Var_Samp_Fields>;
  variance?: Maybe<Product_Skus_Variance_Fields>;
};


/** aggregate fields of "product_skus" */
export type Product_Skus_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Product_Skus_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "product_skus" */
export type Product_Skus_Aggregate_Order_By = {
  avg?: InputMaybe<Product_Skus_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Product_Skus_Max_Order_By>;
  min?: InputMaybe<Product_Skus_Min_Order_By>;
  stddev?: InputMaybe<Product_Skus_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Product_Skus_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Product_Skus_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Product_Skus_Sum_Order_By>;
  var_pop?: InputMaybe<Product_Skus_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Product_Skus_Var_Samp_Order_By>;
  variance?: InputMaybe<Product_Skus_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "product_skus" */
export type Product_Skus_Arr_Rel_Insert_Input = {
  data: Array<Product_Skus_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Product_Skus_On_Conflict>;
};

/** aggregate avg on columns */
export type Product_Skus_Avg_Fields = {
  __typename?: 'product_skus_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 价格，单位元 */
  price?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个产品 */
  product_products?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大在越前面 */
  sort_order?: Maybe<Scalars['Float']['output']>;
  /** 库存 */
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "product_skus" */
export type Product_Skus_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 价格，单位元 */
  price?: InputMaybe<Order_By>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Order_By>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Order_By>;
  /** 库存 */
  stock?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "product_skus". All fields are combined with a logical 'AND'. */
export type Product_Skus_Bool_Exp = {
  _and?: InputMaybe<Array<Product_Skus_Bool_Exp>>;
  _not?: InputMaybe<Product_Skus_Bool_Exp>;
  _or?: InputMaybe<Array<Product_Skus_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  is_shelved?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  product?: InputMaybe<Products_Bool_Exp>;
  product_products?: InputMaybe<Bigint_Comparison_Exp>;
  shop_order_items?: InputMaybe<Shop_Order_Items_Bool_Exp>;
  shop_order_items_aggregate?: InputMaybe<Shop_Order_Items_Aggregate_Bool_Exp>;
  sort_order?: InputMaybe<Bigint_Comparison_Exp>;
  stock?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_skus" */
export enum Product_Skus_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProductSkusPkey = 'product_skus_pkey'
}

/** input type for incrementing numeric columns in table "product_skus" */
export type Product_Skus_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 价格，单位元 */
  price?: InputMaybe<Scalars['numeric']['input']>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Scalars['bigint']['input']>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Scalars['bigint']['input']>;
  /** 库存 */
  stock?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "product_skus" */
export type Product_Skus_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 规格图片url */
  image_url?: InputMaybe<Scalars['String']['input']>;
  /** 是否下架（下架后将不会展示给客户） */
  is_shelved?: InputMaybe<Scalars['Boolean']['input']>;
  /** 规格名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 价格，单位元 */
  price?: InputMaybe<Scalars['numeric']['input']>;
  product?: InputMaybe<Products_Obj_Rel_Insert_Input>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Scalars['bigint']['input']>;
  shop_order_items?: InputMaybe<Shop_Order_Items_Arr_Rel_Insert_Input>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Scalars['bigint']['input']>;
  /** 库存 */
  stock?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Product_Skus_Max_Fields = {
  __typename?: 'product_skus_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 规格图片url */
  image_url?: Maybe<Scalars['String']['output']>;
  /** 规格名称 */
  name?: Maybe<Scalars['String']['output']>;
  /** 价格，单位元 */
  price?: Maybe<Scalars['numeric']['output']>;
  /** 关联外建，哪个产品 */
  product_products?: Maybe<Scalars['bigint']['output']>;
  /** 排序，越大在越前面 */
  sort_order?: Maybe<Scalars['bigint']['output']>;
  /** 库存 */
  stock?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "product_skus" */
export type Product_Skus_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 规格图片url */
  image_url?: InputMaybe<Order_By>;
  /** 规格名称 */
  name?: InputMaybe<Order_By>;
  /** 价格，单位元 */
  price?: InputMaybe<Order_By>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Order_By>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Order_By>;
  /** 库存 */
  stock?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Skus_Min_Fields = {
  __typename?: 'product_skus_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 规格图片url */
  image_url?: Maybe<Scalars['String']['output']>;
  /** 规格名称 */
  name?: Maybe<Scalars['String']['output']>;
  /** 价格，单位元 */
  price?: Maybe<Scalars['numeric']['output']>;
  /** 关联外建，哪个产品 */
  product_products?: Maybe<Scalars['bigint']['output']>;
  /** 排序，越大在越前面 */
  sort_order?: Maybe<Scalars['bigint']['output']>;
  /** 库存 */
  stock?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "product_skus" */
export type Product_Skus_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 规格图片url */
  image_url?: InputMaybe<Order_By>;
  /** 规格名称 */
  name?: InputMaybe<Order_By>;
  /** 价格，单位元 */
  price?: InputMaybe<Order_By>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Order_By>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Order_By>;
  /** 库存 */
  stock?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "product_skus" */
export type Product_Skus_Mutation_Response = {
  __typename?: 'product_skus_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Product_Skus>;
};

/** input type for inserting object relation for remote table "product_skus" */
export type Product_Skus_Obj_Rel_Insert_Input = {
  data: Product_Skus_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Product_Skus_On_Conflict>;
};

/** on_conflict condition type for table "product_skus" */
export type Product_Skus_On_Conflict = {
  constraint: Product_Skus_Constraint;
  update_columns?: Array<Product_Skus_Update_Column>;
  where?: InputMaybe<Product_Skus_Bool_Exp>;
};

/** Ordering options when selecting data from "product_skus". */
export type Product_Skus_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  is_shelved?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product?: InputMaybe<Products_Order_By>;
  product_products?: InputMaybe<Order_By>;
  shop_order_items_aggregate?: InputMaybe<Shop_Order_Items_Aggregate_Order_By>;
  sort_order?: InputMaybe<Order_By>;
  stock?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: product_skus */
export type Product_Skus_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "product_skus" */
export enum Product_Skus_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  IsShelved = 'is_shelved',
  /** column name */
  Name = 'name',
  /** column name */
  Price = 'price',
  /** column name */
  ProductProducts = 'product_products',
  /** column name */
  SortOrder = 'sort_order',
  /** column name */
  Stock = 'stock',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** select "product_skus_aggregate_bool_exp_bool_and_arguments_columns" columns of table "product_skus" */
export enum Product_Skus_Select_Column_Product_Skus_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsShelved = 'is_shelved'
}

/** select "product_skus_aggregate_bool_exp_bool_or_arguments_columns" columns of table "product_skus" */
export enum Product_Skus_Select_Column_Product_Skus_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsShelved = 'is_shelved'
}

/** input type for updating data in table "product_skus" */
export type Product_Skus_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 规格图片url */
  image_url?: InputMaybe<Scalars['String']['input']>;
  /** 是否下架（下架后将不会展示给客户） */
  is_shelved?: InputMaybe<Scalars['Boolean']['input']>;
  /** 规格名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 价格，单位元 */
  price?: InputMaybe<Scalars['numeric']['input']>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Scalars['bigint']['input']>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Scalars['bigint']['input']>;
  /** 库存 */
  stock?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Product_Skus_Stddev_Fields = {
  __typename?: 'product_skus_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 价格，单位元 */
  price?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个产品 */
  product_products?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大在越前面 */
  sort_order?: Maybe<Scalars['Float']['output']>;
  /** 库存 */
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "product_skus" */
export type Product_Skus_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 价格，单位元 */
  price?: InputMaybe<Order_By>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Order_By>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Order_By>;
  /** 库存 */
  stock?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Product_Skus_Stddev_Pop_Fields = {
  __typename?: 'product_skus_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 价格，单位元 */
  price?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个产品 */
  product_products?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大在越前面 */
  sort_order?: Maybe<Scalars['Float']['output']>;
  /** 库存 */
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "product_skus" */
export type Product_Skus_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 价格，单位元 */
  price?: InputMaybe<Order_By>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Order_By>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Order_By>;
  /** 库存 */
  stock?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Product_Skus_Stddev_Samp_Fields = {
  __typename?: 'product_skus_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 价格，单位元 */
  price?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个产品 */
  product_products?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大在越前面 */
  sort_order?: Maybe<Scalars['Float']['output']>;
  /** 库存 */
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "product_skus" */
export type Product_Skus_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 价格，单位元 */
  price?: InputMaybe<Order_By>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Order_By>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Order_By>;
  /** 库存 */
  stock?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "product_skus" */
export type Product_Skus_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Product_Skus_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Product_Skus_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 规格图片url */
  image_url?: InputMaybe<Scalars['String']['input']>;
  /** 是否下架（下架后将不会展示给客户） */
  is_shelved?: InputMaybe<Scalars['Boolean']['input']>;
  /** 规格名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 价格，单位元 */
  price?: InputMaybe<Scalars['numeric']['input']>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Scalars['bigint']['input']>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Scalars['bigint']['input']>;
  /** 库存 */
  stock?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Product_Skus_Sum_Fields = {
  __typename?: 'product_skus_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  /** 价格，单位元 */
  price?: Maybe<Scalars['numeric']['output']>;
  /** 关联外建，哪个产品 */
  product_products?: Maybe<Scalars['bigint']['output']>;
  /** 排序，越大在越前面 */
  sort_order?: Maybe<Scalars['bigint']['output']>;
  /** 库存 */
  stock?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "product_skus" */
export type Product_Skus_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 价格，单位元 */
  price?: InputMaybe<Order_By>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Order_By>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Order_By>;
  /** 库存 */
  stock?: InputMaybe<Order_By>;
};

/** update columns of table "product_skus" */
export enum Product_Skus_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  IsShelved = 'is_shelved',
  /** column name */
  Name = 'name',
  /** column name */
  Price = 'price',
  /** column name */
  ProductProducts = 'product_products',
  /** column name */
  SortOrder = 'sort_order',
  /** column name */
  Stock = 'stock',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Product_Skus_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Product_Skus_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Product_Skus_Set_Input>;
  /** filter the rows which have to be updated */
  where: Product_Skus_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Product_Skus_Var_Pop_Fields = {
  __typename?: 'product_skus_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 价格，单位元 */
  price?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个产品 */
  product_products?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大在越前面 */
  sort_order?: Maybe<Scalars['Float']['output']>;
  /** 库存 */
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "product_skus" */
export type Product_Skus_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 价格，单位元 */
  price?: InputMaybe<Order_By>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Order_By>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Order_By>;
  /** 库存 */
  stock?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Product_Skus_Var_Samp_Fields = {
  __typename?: 'product_skus_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 价格，单位元 */
  price?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个产品 */
  product_products?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大在越前面 */
  sort_order?: Maybe<Scalars['Float']['output']>;
  /** 库存 */
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "product_skus" */
export type Product_Skus_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 价格，单位元 */
  price?: InputMaybe<Order_By>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Order_By>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Order_By>;
  /** 库存 */
  stock?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Product_Skus_Variance_Fields = {
  __typename?: 'product_skus_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 价格，单位元 */
  price?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个产品 */
  product_products?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大在越前面 */
  sort_order?: Maybe<Scalars['Float']['output']>;
  /** 库存 */
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "product_skus" */
export type Product_Skus_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 价格，单位元 */
  price?: InputMaybe<Order_By>;
  /** 关联外建，哪个产品 */
  product_products?: InputMaybe<Order_By>;
  /** 排序，越大在越前面 */
  sort_order?: InputMaybe<Order_By>;
  /** 库存 */
  stock?: InputMaybe<Order_By>;
};

/** 店铺产品表 */
export type Products = {
  __typename?: 'products';
  /** 封面图片url */
  cover_image_url?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamptz']['output'];
  /** 商品介绍，富文本 */
  description?: Maybe<Scalars['String']['output']>;
  /** 产品信息媒体内容, json数组 item项（file_type=video|image、file_url） */
  detail_medias: Scalars['json']['output'];
  id: Scalars['bigint']['output'];
  /** 是否下架，下架后将不会展示给客户 */
  is_shelved: Scalars['Boolean']['output'];
  /** 产品名称 */
  name: Scalars['String']['output'];
  /** An array relationship */
  product_skus: Array<Product_Skus>;
  /** An aggregate relationship */
  product_skus_aggregate: Product_Skus_Aggregate;
  /** An object relationship */
  shop: Shops;
  /** 产品所属店铺 */
  shop_shops: Scalars['bigint']['output'];
  /** 排序，越大越前 */
  sort_order: Scalars['bigint']['output'];
  updated_at: Scalars['timestamptz']['output'];
};


/** 店铺产品表 */
export type ProductsDetail_MediasArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** 店铺产品表 */
export type ProductsProduct_SkusArgs = {
  distinct_on?: InputMaybe<Array<Product_Skus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Skus_Order_By>>;
  where?: InputMaybe<Product_Skus_Bool_Exp>;
};


/** 店铺产品表 */
export type ProductsProduct_Skus_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Skus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Skus_Order_By>>;
  where?: InputMaybe<Product_Skus_Bool_Exp>;
};

/** aggregated selection of "products" */
export type Products_Aggregate = {
  __typename?: 'products_aggregate';
  aggregate?: Maybe<Products_Aggregate_Fields>;
  nodes: Array<Products>;
};

export type Products_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Products_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Products_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Products_Aggregate_Bool_Exp_Count>;
};

export type Products_Aggregate_Bool_Exp_Bool_And = {
  arguments: Products_Select_Column_Products_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Products_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Products_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Products_Select_Column_Products_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Products_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Products_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Products_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Products_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "products" */
export type Products_Aggregate_Fields = {
  __typename?: 'products_aggregate_fields';
  avg?: Maybe<Products_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Products_Max_Fields>;
  min?: Maybe<Products_Min_Fields>;
  stddev?: Maybe<Products_Stddev_Fields>;
  stddev_pop?: Maybe<Products_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Products_Stddev_Samp_Fields>;
  sum?: Maybe<Products_Sum_Fields>;
  var_pop?: Maybe<Products_Var_Pop_Fields>;
  var_samp?: Maybe<Products_Var_Samp_Fields>;
  variance?: Maybe<Products_Variance_Fields>;
};


/** aggregate fields of "products" */
export type Products_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Products_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "products" */
export type Products_Aggregate_Order_By = {
  avg?: InputMaybe<Products_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Products_Max_Order_By>;
  min?: InputMaybe<Products_Min_Order_By>;
  stddev?: InputMaybe<Products_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Products_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Products_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Products_Sum_Order_By>;
  var_pop?: InputMaybe<Products_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Products_Var_Samp_Order_By>;
  variance?: InputMaybe<Products_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "products" */
export type Products_Arr_Rel_Insert_Input = {
  data: Array<Products_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Products_On_Conflict>;
};

/** aggregate avg on columns */
export type Products_Avg_Fields = {
  __typename?: 'products_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 产品所属店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大越前 */
  sort_order?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "products" */
export type Products_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "products". All fields are combined with a logical 'AND'. */
export type Products_Bool_Exp = {
  _and?: InputMaybe<Array<Products_Bool_Exp>>;
  _not?: InputMaybe<Products_Bool_Exp>;
  _or?: InputMaybe<Array<Products_Bool_Exp>>;
  cover_image_url?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  detail_medias?: InputMaybe<Json_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  is_shelved?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  product_skus?: InputMaybe<Product_Skus_Bool_Exp>;
  product_skus_aggregate?: InputMaybe<Product_Skus_Aggregate_Bool_Exp>;
  shop?: InputMaybe<Shops_Bool_Exp>;
  shop_shops?: InputMaybe<Bigint_Comparison_Exp>;
  sort_order?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "products" */
export enum Products_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProductsPkey = 'products_pkey',
  /** unique or primary key constraint on columns "shop_shops", "name" */
  ProductsShopShopsNameKey = 'products_shop_shops_name_key'
}

/** input type for incrementing numeric columns in table "products" */
export type Products_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "products" */
export type Products_Insert_Input = {
  /** 封面图片url */
  cover_image_url?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 商品介绍，富文本 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 产品信息媒体内容, json数组 item项（file_type=video|image、file_url） */
  detail_medias?: InputMaybe<Scalars['json']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 是否下架，下架后将不会展示给客户 */
  is_shelved?: InputMaybe<Scalars['Boolean']['input']>;
  /** 产品名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  product_skus?: InputMaybe<Product_Skus_Arr_Rel_Insert_Input>;
  shop?: InputMaybe<Shops_Obj_Rel_Insert_Input>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Products_Max_Fields = {
  __typename?: 'products_max_fields';
  /** 封面图片url */
  cover_image_url?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 商品介绍，富文本 */
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 产品名称 */
  name?: Maybe<Scalars['String']['output']>;
  /** 产品所属店铺 */
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  /** 排序，越大越前 */
  sort_order?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "products" */
export type Products_Max_Order_By = {
  /** 封面图片url */
  cover_image_url?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  /** 商品介绍，富文本 */
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 产品名称 */
  name?: InputMaybe<Order_By>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Products_Min_Fields = {
  __typename?: 'products_min_fields';
  /** 封面图片url */
  cover_image_url?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 商品介绍，富文本 */
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 产品名称 */
  name?: Maybe<Scalars['String']['output']>;
  /** 产品所属店铺 */
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  /** 排序，越大越前 */
  sort_order?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "products" */
export type Products_Min_Order_By = {
  /** 封面图片url */
  cover_image_url?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  /** 商品介绍，富文本 */
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 产品名称 */
  name?: InputMaybe<Order_By>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "products" */
export type Products_Mutation_Response = {
  __typename?: 'products_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Products>;
};

/** input type for inserting object relation for remote table "products" */
export type Products_Obj_Rel_Insert_Input = {
  data: Products_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Products_On_Conflict>;
};

/** on_conflict condition type for table "products" */
export type Products_On_Conflict = {
  constraint: Products_Constraint;
  update_columns?: Array<Products_Update_Column>;
  where?: InputMaybe<Products_Bool_Exp>;
};

/** Ordering options when selecting data from "products". */
export type Products_Order_By = {
  cover_image_url?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  detail_medias?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_shelved?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  product_skus_aggregate?: InputMaybe<Product_Skus_Aggregate_Order_By>;
  shop?: InputMaybe<Shops_Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  sort_order?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: products */
export type Products_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "products" */
export enum Products_Select_Column {
  /** column name */
  CoverImageUrl = 'cover_image_url',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  DetailMedias = 'detail_medias',
  /** column name */
  Id = 'id',
  /** column name */
  IsShelved = 'is_shelved',
  /** column name */
  Name = 'name',
  /** column name */
  ShopShops = 'shop_shops',
  /** column name */
  SortOrder = 'sort_order',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** select "products_aggregate_bool_exp_bool_and_arguments_columns" columns of table "products" */
export enum Products_Select_Column_Products_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsShelved = 'is_shelved'
}

/** select "products_aggregate_bool_exp_bool_or_arguments_columns" columns of table "products" */
export enum Products_Select_Column_Products_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsShelved = 'is_shelved'
}

/** input type for updating data in table "products" */
export type Products_Set_Input = {
  /** 封面图片url */
  cover_image_url?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 商品介绍，富文本 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 产品信息媒体内容, json数组 item项（file_type=video|image、file_url） */
  detail_medias?: InputMaybe<Scalars['json']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 是否下架，下架后将不会展示给客户 */
  is_shelved?: InputMaybe<Scalars['Boolean']['input']>;
  /** 产品名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Products_Stddev_Fields = {
  __typename?: 'products_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 产品所属店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大越前 */
  sort_order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "products" */
export type Products_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Products_Stddev_Pop_Fields = {
  __typename?: 'products_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 产品所属店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大越前 */
  sort_order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "products" */
export type Products_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Products_Stddev_Samp_Fields = {
  __typename?: 'products_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 产品所属店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大越前 */
  sort_order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "products" */
export type Products_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "products" */
export type Products_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Products_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Products_Stream_Cursor_Value_Input = {
  /** 封面图片url */
  cover_image_url?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 商品介绍，富文本 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 产品信息媒体内容, json数组 item项（file_type=video|image、file_url） */
  detail_medias?: InputMaybe<Scalars['json']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 是否下架，下架后将不会展示给客户 */
  is_shelved?: InputMaybe<Scalars['Boolean']['input']>;
  /** 产品名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Products_Sum_Fields = {
  __typename?: 'products_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  /** 产品所属店铺 */
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  /** 排序，越大越前 */
  sort_order?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "products" */
export type Products_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Order_By>;
};

/** update columns of table "products" */
export enum Products_Update_Column {
  /** column name */
  CoverImageUrl = 'cover_image_url',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  DetailMedias = 'detail_medias',
  /** column name */
  Id = 'id',
  /** column name */
  IsShelved = 'is_shelved',
  /** column name */
  Name = 'name',
  /** column name */
  ShopShops = 'shop_shops',
  /** column name */
  SortOrder = 'sort_order',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Products_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Products_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Products_Set_Input>;
  /** filter the rows which have to be updated */
  where: Products_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Products_Var_Pop_Fields = {
  __typename?: 'products_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 产品所属店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大越前 */
  sort_order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "products" */
export type Products_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Products_Var_Samp_Fields = {
  __typename?: 'products_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 产品所属店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大越前 */
  sort_order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "products" */
export type Products_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Products_Variance_Fields = {
  __typename?: 'products_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 产品所属店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 排序，越大越前 */
  sort_order?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "products" */
export type Products_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 产品所属店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 排序，越大越前 */
  sort_order?: InputMaybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "accounts" */
  accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "accounts" */
  accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accounts_by_pk?: Maybe<Accounts>;
  /** An array relationship */
  building_rooms: Array<Building_Rooms>;
  /** An aggregate relationship */
  building_rooms_aggregate: Building_Rooms_Aggregate;
  /** fetch data from the table: "building_rooms" using primary key columns */
  building_rooms_by_pk?: Maybe<Building_Rooms>;
  /** An array relationship */
  buildings: Array<Buildings>;
  /** An aggregate relationship */
  buildings_aggregate: Buildings_Aggregate;
  /** fetch data from the table: "buildings" using primary key columns */
  buildings_by_pk?: Maybe<Buildings>;
  /** fetch data from the table: "campuses" */
  campuses: Array<Campuses>;
  /** fetch aggregated fields from the table: "campuses" */
  campuses_aggregate: Campuses_Aggregate;
  /** fetch data from the table: "campuses" using primary key columns */
  campuses_by_pk?: Maybe<Campuses>;
  /** An array relationship */
  product_skus: Array<Product_Skus>;
  /** An aggregate relationship */
  product_skus_aggregate: Product_Skus_Aggregate;
  /** fetch data from the table: "product_skus" using primary key columns */
  product_skus_by_pk?: Maybe<Product_Skus>;
  /** An array relationship */
  products: Array<Products>;
  /** An aggregate relationship */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** An array relationship */
  shop_carts: Array<Shop_Carts>;
  /** An aggregate relationship */
  shop_carts_aggregate: Shop_Carts_Aggregate;
  /** fetch data from the table: "shop_carts" using primary key columns */
  shop_carts_by_pk?: Maybe<Shop_Carts>;
  /** An array relationship */
  shop_order_items: Array<Shop_Order_Items>;
  /** An aggregate relationship */
  shop_order_items_aggregate: Shop_Order_Items_Aggregate;
  /** fetch data from the table: "shop_order_items" using primary key columns */
  shop_order_items_by_pk?: Maybe<Shop_Order_Items>;
  /** An array relationship */
  shop_orders: Array<Shop_Orders>;
  /** An aggregate relationship */
  shop_orders_aggregate: Shop_Orders_Aggregate;
  /** fetch data from the table: "shop_orders" using primary key columns */
  shop_orders_by_pk?: Maybe<Shop_Orders>;
  /** An array relationship */
  shop_userorders: Array<Shop_Userorders>;
  /** An aggregate relationship */
  shop_userorders_aggregate: Shop_Userorders_Aggregate;
  /** fetch data from the table: "shop_userorders" using primary key columns */
  shop_userorders_by_pk?: Maybe<Shop_Userorders>;
  /** An array relationship */
  shop_users: Array<Shop_Users>;
  /** An aggregate relationship */
  shop_users_aggregate: Shop_Users_Aggregate;
  /** fetch data from the table: "shop_users" using primary key columns */
  shop_users_by_pk?: Maybe<Shop_Users>;
  /** fetch data from the table: "shops" */
  shops: Array<Shops>;
  /** fetch aggregated fields from the table: "shops" */
  shops_aggregate: Shops_Aggregate;
  /** fetch data from the table: "shops" using primary key columns */
  shops_by_pk?: Maybe<Shops>;
  /** An array relationship */
  user_accounts: Array<User_Accounts>;
  /** An aggregate relationship */
  user_accounts_aggregate: User_Accounts_Aggregate;
  /** fetch data from the table: "user_accounts" using primary key columns */
  user_accounts_by_pk?: Maybe<User_Accounts>;
  /** fetch data from the table: "user_addresses" */
  user_addresses: Array<User_Addresses>;
  /** fetch aggregated fields from the table: "user_addresses" */
  user_addresses_aggregate: User_Addresses_Aggregate;
  /** fetch data from the table: "user_addresses" using primary key columns */
  user_addresses_by_pk?: Maybe<User_Addresses>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootBuilding_RoomsArgs = {
  distinct_on?: InputMaybe<Array<Building_Rooms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Building_Rooms_Order_By>>;
  where?: InputMaybe<Building_Rooms_Bool_Exp>;
};


export type Query_RootBuilding_Rooms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Building_Rooms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Building_Rooms_Order_By>>;
  where?: InputMaybe<Building_Rooms_Bool_Exp>;
};


export type Query_RootBuilding_Rooms_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootBuildingsArgs = {
  distinct_on?: InputMaybe<Array<Buildings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Buildings_Order_By>>;
  where?: InputMaybe<Buildings_Bool_Exp>;
};


export type Query_RootBuildings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Buildings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Buildings_Order_By>>;
  where?: InputMaybe<Buildings_Bool_Exp>;
};


export type Query_RootBuildings_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootCampusesArgs = {
  distinct_on?: InputMaybe<Array<Campuses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campuses_Order_By>>;
  where?: InputMaybe<Campuses_Bool_Exp>;
};


export type Query_RootCampuses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Campuses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campuses_Order_By>>;
  where?: InputMaybe<Campuses_Bool_Exp>;
};


export type Query_RootCampuses_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootProduct_SkusArgs = {
  distinct_on?: InputMaybe<Array<Product_Skus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Skus_Order_By>>;
  where?: InputMaybe<Product_Skus_Bool_Exp>;
};


export type Query_RootProduct_Skus_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Skus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Skus_Order_By>>;
  where?: InputMaybe<Product_Skus_Bool_Exp>;
};


export type Query_RootProduct_Skus_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Query_RootProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Query_RootProducts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootShop_CartsArgs = {
  distinct_on?: InputMaybe<Array<Shop_Carts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Carts_Order_By>>;
  where?: InputMaybe<Shop_Carts_Bool_Exp>;
};


export type Query_RootShop_Carts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Carts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Carts_Order_By>>;
  where?: InputMaybe<Shop_Carts_Bool_Exp>;
};


export type Query_RootShop_Carts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootShop_Order_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Shop_Order_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Order_Items_Order_By>>;
  where?: InputMaybe<Shop_Order_Items_Bool_Exp>;
};


export type Query_RootShop_Order_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Order_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Order_Items_Order_By>>;
  where?: InputMaybe<Shop_Order_Items_Bool_Exp>;
};


export type Query_RootShop_Order_Items_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootShop_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Shop_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Orders_Order_By>>;
  where?: InputMaybe<Shop_Orders_Bool_Exp>;
};


export type Query_RootShop_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Orders_Order_By>>;
  where?: InputMaybe<Shop_Orders_Bool_Exp>;
};


export type Query_RootShop_Orders_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootShop_UserordersArgs = {
  distinct_on?: InputMaybe<Array<Shop_Userorders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Userorders_Order_By>>;
  where?: InputMaybe<Shop_Userorders_Bool_Exp>;
};


export type Query_RootShop_Userorders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Userorders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Userorders_Order_By>>;
  where?: InputMaybe<Shop_Userorders_Bool_Exp>;
};


export type Query_RootShop_Userorders_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootShop_UsersArgs = {
  distinct_on?: InputMaybe<Array<Shop_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Users_Order_By>>;
  where?: InputMaybe<Shop_Users_Bool_Exp>;
};


export type Query_RootShop_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Users_Order_By>>;
  where?: InputMaybe<Shop_Users_Bool_Exp>;
};


export type Query_RootShop_Users_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootShopsArgs = {
  distinct_on?: InputMaybe<Array<Shops_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shops_Order_By>>;
  where?: InputMaybe<Shops_Bool_Exp>;
};


export type Query_RootShops_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shops_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shops_Order_By>>;
  where?: InputMaybe<Shops_Bool_Exp>;
};


export type Query_RootShops_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootUser_AccountsArgs = {
  distinct_on?: InputMaybe<Array<User_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Accounts_Order_By>>;
  where?: InputMaybe<User_Accounts_Bool_Exp>;
};


export type Query_RootUser_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Accounts_Order_By>>;
  where?: InputMaybe<User_Accounts_Bool_Exp>;
};


export type Query_RootUser_Accounts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootUser_AddressesArgs = {
  distinct_on?: InputMaybe<Array<User_Addresses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Addresses_Order_By>>;
  where?: InputMaybe<User_Addresses_Bool_Exp>;
};


export type Query_RootUser_Addresses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Addresses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Addresses_Order_By>>;
  where?: InputMaybe<User_Addresses_Bool_Exp>;
};


export type Query_RootUser_Addresses_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['bigint']['input'];
};

/** 店铺购物车 */
export type Shop_Carts = {
  __typename?: 'shop_carts';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** 关联sku */
  product_sku_product_skus: Scalars['bigint']['output'];
  /** 数量 */
  quantity: Scalars['bigint']['output'];
  /** An object relationship */
  shop: Shops;
  /** 关联店铺 */
  shop_shops: Scalars['bigint']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  /** 关联用户 */
  user_users: Scalars['bigint']['output'];
};

/** aggregated selection of "shop_carts" */
export type Shop_Carts_Aggregate = {
  __typename?: 'shop_carts_aggregate';
  aggregate?: Maybe<Shop_Carts_Aggregate_Fields>;
  nodes: Array<Shop_Carts>;
};

export type Shop_Carts_Aggregate_Bool_Exp = {
  count?: InputMaybe<Shop_Carts_Aggregate_Bool_Exp_Count>;
};

export type Shop_Carts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Shop_Carts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Shop_Carts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "shop_carts" */
export type Shop_Carts_Aggregate_Fields = {
  __typename?: 'shop_carts_aggregate_fields';
  avg?: Maybe<Shop_Carts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Shop_Carts_Max_Fields>;
  min?: Maybe<Shop_Carts_Min_Fields>;
  stddev?: Maybe<Shop_Carts_Stddev_Fields>;
  stddev_pop?: Maybe<Shop_Carts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Shop_Carts_Stddev_Samp_Fields>;
  sum?: Maybe<Shop_Carts_Sum_Fields>;
  var_pop?: Maybe<Shop_Carts_Var_Pop_Fields>;
  var_samp?: Maybe<Shop_Carts_Var_Samp_Fields>;
  variance?: Maybe<Shop_Carts_Variance_Fields>;
};


/** aggregate fields of "shop_carts" */
export type Shop_Carts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Shop_Carts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "shop_carts" */
export type Shop_Carts_Aggregate_Order_By = {
  avg?: InputMaybe<Shop_Carts_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Shop_Carts_Max_Order_By>;
  min?: InputMaybe<Shop_Carts_Min_Order_By>;
  stddev?: InputMaybe<Shop_Carts_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Shop_Carts_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Shop_Carts_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Shop_Carts_Sum_Order_By>;
  var_pop?: InputMaybe<Shop_Carts_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Shop_Carts_Var_Samp_Order_By>;
  variance?: InputMaybe<Shop_Carts_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "shop_carts" */
export type Shop_Carts_Arr_Rel_Insert_Input = {
  data: Array<Shop_Carts_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Shop_Carts_On_Conflict>;
};

/** aggregate avg on columns */
export type Shop_Carts_Avg_Fields = {
  __typename?: 'shop_carts_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 关联店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "shop_carts" */
export type Shop_Carts_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 数量 */
  quantity?: InputMaybe<Order_By>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联用户 */
  user_users?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "shop_carts". All fields are combined with a logical 'AND'. */
export type Shop_Carts_Bool_Exp = {
  _and?: InputMaybe<Array<Shop_Carts_Bool_Exp>>;
  _not?: InputMaybe<Shop_Carts_Bool_Exp>;
  _or?: InputMaybe<Array<Shop_Carts_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  product_sku_product_skus?: InputMaybe<Bigint_Comparison_Exp>;
  quantity?: InputMaybe<Bigint_Comparison_Exp>;
  shop?: InputMaybe<Shops_Bool_Exp>;
  shop_shops?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_users?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "shop_carts" */
export enum Shop_Carts_Constraint {
  /** unique or primary key constraint on columns "id" */
  ShopCartsPkey = 'shop_carts_pkey',
  /** unique or primary key constraint on columns "user_users", "shop_shops", "product_sku_product_skus" */
  ShopCartsShopShopsUserUsersProductSkuProductSkusKey = 'shop_carts_shop_shops_user_users_product_sku_product_skus_key'
}

/** input type for incrementing numeric columns in table "shop_carts" */
export type Shop_Carts_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Scalars['bigint']['input']>;
  /** 数量 */
  quantity?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联用户 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "shop_carts" */
export type Shop_Carts_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Scalars['bigint']['input']>;
  /** 数量 */
  quantity?: InputMaybe<Scalars['bigint']['input']>;
  shop?: InputMaybe<Shops_Obj_Rel_Insert_Input>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  /** 关联用户 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type Shop_Carts_Max_Fields = {
  __typename?: 'shop_carts_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 关联sku */
  product_sku_product_skus?: Maybe<Scalars['bigint']['output']>;
  /** 数量 */
  quantity?: Maybe<Scalars['bigint']['output']>;
  /** 关联店铺 */
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 关联用户 */
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "shop_carts" */
export type Shop_Carts_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 数量 */
  quantity?: InputMaybe<Order_By>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  /** 关联用户 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Shop_Carts_Min_Fields = {
  __typename?: 'shop_carts_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 关联sku */
  product_sku_product_skus?: Maybe<Scalars['bigint']['output']>;
  /** 数量 */
  quantity?: Maybe<Scalars['bigint']['output']>;
  /** 关联店铺 */
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 关联用户 */
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "shop_carts" */
export type Shop_Carts_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 数量 */
  quantity?: InputMaybe<Order_By>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  /** 关联用户 */
  user_users?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "shop_carts" */
export type Shop_Carts_Mutation_Response = {
  __typename?: 'shop_carts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Shop_Carts>;
};

/** on_conflict condition type for table "shop_carts" */
export type Shop_Carts_On_Conflict = {
  constraint: Shop_Carts_Constraint;
  update_columns?: Array<Shop_Carts_Update_Column>;
  where?: InputMaybe<Shop_Carts_Bool_Exp>;
};

/** Ordering options when selecting data from "shop_carts". */
export type Shop_Carts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product_sku_product_skus?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  shop?: InputMaybe<Shops_Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** primary key columns input for table: shop_carts */
export type Shop_Carts_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "shop_carts" */
export enum Shop_Carts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProductSkuProductSkus = 'product_sku_product_skus',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  ShopShops = 'shop_shops',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserUsers = 'user_users'
}

/** input type for updating data in table "shop_carts" */
export type Shop_Carts_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Scalars['bigint']['input']>;
  /** 数量 */
  quantity?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 关联用户 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type Shop_Carts_Stddev_Fields = {
  __typename?: 'shop_carts_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 关联店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "shop_carts" */
export type Shop_Carts_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 数量 */
  quantity?: InputMaybe<Order_By>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联用户 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Shop_Carts_Stddev_Pop_Fields = {
  __typename?: 'shop_carts_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 关联店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "shop_carts" */
export type Shop_Carts_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 数量 */
  quantity?: InputMaybe<Order_By>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联用户 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Shop_Carts_Stddev_Samp_Fields = {
  __typename?: 'shop_carts_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 关联店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "shop_carts" */
export type Shop_Carts_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 数量 */
  quantity?: InputMaybe<Order_By>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联用户 */
  user_users?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "shop_carts" */
export type Shop_Carts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Shop_Carts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Shop_Carts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Scalars['bigint']['input']>;
  /** 数量 */
  quantity?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 关联用户 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Shop_Carts_Sum_Fields = {
  __typename?: 'shop_carts_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  /** 关联sku */
  product_sku_product_skus?: Maybe<Scalars['bigint']['output']>;
  /** 数量 */
  quantity?: Maybe<Scalars['bigint']['output']>;
  /** 关联店铺 */
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  /** 关联用户 */
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "shop_carts" */
export type Shop_Carts_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 数量 */
  quantity?: InputMaybe<Order_By>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联用户 */
  user_users?: InputMaybe<Order_By>;
};

/** update columns of table "shop_carts" */
export enum Shop_Carts_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProductSkuProductSkus = 'product_sku_product_skus',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  ShopShops = 'shop_shops',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserUsers = 'user_users'
}

export type Shop_Carts_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Shop_Carts_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Shop_Carts_Set_Input>;
  /** filter the rows which have to be updated */
  where: Shop_Carts_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Shop_Carts_Var_Pop_Fields = {
  __typename?: 'shop_carts_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 关联店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "shop_carts" */
export type Shop_Carts_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 数量 */
  quantity?: InputMaybe<Order_By>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联用户 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Shop_Carts_Var_Samp_Fields = {
  __typename?: 'shop_carts_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 关联店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "shop_carts" */
export type Shop_Carts_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 数量 */
  quantity?: InputMaybe<Order_By>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联用户 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Shop_Carts_Variance_Fields = {
  __typename?: 'shop_carts_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 关联店铺 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "shop_carts" */
export type Shop_Carts_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 关联sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 数量 */
  quantity?: InputMaybe<Order_By>;
  /** 关联店铺 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联用户 */
  user_users?: InputMaybe<Order_By>;
};

/** 订单商品表 */
export type Shop_Order_Items = {
  __typename?: 'shop_order_items';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** 快照，产品封面图，没有规格封面图的时候显示 */
  product_cover_image_url: Scalars['String']['output'];
  /** 快照，产品名称 */
  product_name: Scalars['String']['output'];
  /** An object relationship */
  product_sku: Product_Skus;
  /** 快照，商品sku的图片 */
  product_sku_image_url?: Maybe<Scalars['String']['output']>;
  /** 快照，商品sku的名称 */
  product_sku_name: Scalars['String']['output'];
  /** 快照，商品sku的价格 */
  product_sku_price: Scalars['numeric']['output'];
  /** 关联外键，哪个商品sku */
  product_sku_product_skus: Scalars['bigint']['output'];
  /** 购买数量 */
  quantity: Scalars['bigint']['output'];
  /** An object relationship */
  shop_order: Shop_Orders;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders: Scalars['bigint']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "shop_order_items" */
export type Shop_Order_Items_Aggregate = {
  __typename?: 'shop_order_items_aggregate';
  aggregate?: Maybe<Shop_Order_Items_Aggregate_Fields>;
  nodes: Array<Shop_Order_Items>;
};

export type Shop_Order_Items_Aggregate_Bool_Exp = {
  count?: InputMaybe<Shop_Order_Items_Aggregate_Bool_Exp_Count>;
};

export type Shop_Order_Items_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Shop_Order_Items_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Shop_Order_Items_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "shop_order_items" */
export type Shop_Order_Items_Aggregate_Fields = {
  __typename?: 'shop_order_items_aggregate_fields';
  avg?: Maybe<Shop_Order_Items_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Shop_Order_Items_Max_Fields>;
  min?: Maybe<Shop_Order_Items_Min_Fields>;
  stddev?: Maybe<Shop_Order_Items_Stddev_Fields>;
  stddev_pop?: Maybe<Shop_Order_Items_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Shop_Order_Items_Stddev_Samp_Fields>;
  sum?: Maybe<Shop_Order_Items_Sum_Fields>;
  var_pop?: Maybe<Shop_Order_Items_Var_Pop_Fields>;
  var_samp?: Maybe<Shop_Order_Items_Var_Samp_Fields>;
  variance?: Maybe<Shop_Order_Items_Variance_Fields>;
};


/** aggregate fields of "shop_order_items" */
export type Shop_Order_Items_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Shop_Order_Items_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "shop_order_items" */
export type Shop_Order_Items_Aggregate_Order_By = {
  avg?: InputMaybe<Shop_Order_Items_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Shop_Order_Items_Max_Order_By>;
  min?: InputMaybe<Shop_Order_Items_Min_Order_By>;
  stddev?: InputMaybe<Shop_Order_Items_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Shop_Order_Items_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Shop_Order_Items_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Shop_Order_Items_Sum_Order_By>;
  var_pop?: InputMaybe<Shop_Order_Items_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Shop_Order_Items_Var_Samp_Order_By>;
  variance?: InputMaybe<Shop_Order_Items_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "shop_order_items" */
export type Shop_Order_Items_Arr_Rel_Insert_Input = {
  data: Array<Shop_Order_Items_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Shop_Order_Items_On_Conflict>;
};

/** aggregate avg on columns */
export type Shop_Order_Items_Avg_Fields = {
  __typename?: 'shop_order_items_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 购买数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "shop_order_items" */
export type Shop_Order_Items_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Order_By>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 购买数量 */
  quantity?: InputMaybe<Order_By>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "shop_order_items". All fields are combined with a logical 'AND'. */
export type Shop_Order_Items_Bool_Exp = {
  _and?: InputMaybe<Array<Shop_Order_Items_Bool_Exp>>;
  _not?: InputMaybe<Shop_Order_Items_Bool_Exp>;
  _or?: InputMaybe<Array<Shop_Order_Items_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  product_cover_image_url?: InputMaybe<String_Comparison_Exp>;
  product_name?: InputMaybe<String_Comparison_Exp>;
  product_sku?: InputMaybe<Product_Skus_Bool_Exp>;
  product_sku_image_url?: InputMaybe<String_Comparison_Exp>;
  product_sku_name?: InputMaybe<String_Comparison_Exp>;
  product_sku_price?: InputMaybe<Numeric_Comparison_Exp>;
  product_sku_product_skus?: InputMaybe<Bigint_Comparison_Exp>;
  quantity?: InputMaybe<Bigint_Comparison_Exp>;
  shop_order?: InputMaybe<Shop_Orders_Bool_Exp>;
  shop_order_shop_orders?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "shop_order_items" */
export enum Shop_Order_Items_Constraint {
  /** unique or primary key constraint on columns "id" */
  ShopOrderItemsPkey = 'shop_order_items_pkey'
}

/** input type for incrementing numeric columns in table "shop_order_items" */
export type Shop_Order_Items_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Scalars['numeric']['input']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Scalars['bigint']['input']>;
  /** 购买数量 */
  quantity?: InputMaybe<Scalars['bigint']['input']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "shop_order_items" */
export type Shop_Order_Items_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 快照，产品封面图，没有规格封面图的时候显示 */
  product_cover_image_url?: InputMaybe<Scalars['String']['input']>;
  /** 快照，产品名称 */
  product_name?: InputMaybe<Scalars['String']['input']>;
  product_sku?: InputMaybe<Product_Skus_Obj_Rel_Insert_Input>;
  /** 快照，商品sku的图片 */
  product_sku_image_url?: InputMaybe<Scalars['String']['input']>;
  /** 快照，商品sku的名称 */
  product_sku_name?: InputMaybe<Scalars['String']['input']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Scalars['numeric']['input']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Scalars['bigint']['input']>;
  /** 购买数量 */
  quantity?: InputMaybe<Scalars['bigint']['input']>;
  shop_order?: InputMaybe<Shop_Orders_Obj_Rel_Insert_Input>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Shop_Order_Items_Max_Fields = {
  __typename?: 'shop_order_items_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 快照，产品封面图，没有规格封面图的时候显示 */
  product_cover_image_url?: Maybe<Scalars['String']['output']>;
  /** 快照，产品名称 */
  product_name?: Maybe<Scalars['String']['output']>;
  /** 快照，商品sku的图片 */
  product_sku_image_url?: Maybe<Scalars['String']['output']>;
  /** 快照，商品sku的名称 */
  product_sku_name?: Maybe<Scalars['String']['output']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: Maybe<Scalars['numeric']['output']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: Maybe<Scalars['bigint']['output']>;
  /** 购买数量 */
  quantity?: Maybe<Scalars['bigint']['output']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "shop_order_items" */
export type Shop_Order_Items_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 快照，产品封面图，没有规格封面图的时候显示 */
  product_cover_image_url?: InputMaybe<Order_By>;
  /** 快照，产品名称 */
  product_name?: InputMaybe<Order_By>;
  /** 快照，商品sku的图片 */
  product_sku_image_url?: InputMaybe<Order_By>;
  /** 快照，商品sku的名称 */
  product_sku_name?: InputMaybe<Order_By>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Order_By>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 购买数量 */
  quantity?: InputMaybe<Order_By>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Shop_Order_Items_Min_Fields = {
  __typename?: 'shop_order_items_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 快照，产品封面图，没有规格封面图的时候显示 */
  product_cover_image_url?: Maybe<Scalars['String']['output']>;
  /** 快照，产品名称 */
  product_name?: Maybe<Scalars['String']['output']>;
  /** 快照，商品sku的图片 */
  product_sku_image_url?: Maybe<Scalars['String']['output']>;
  /** 快照，商品sku的名称 */
  product_sku_name?: Maybe<Scalars['String']['output']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: Maybe<Scalars['numeric']['output']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: Maybe<Scalars['bigint']['output']>;
  /** 购买数量 */
  quantity?: Maybe<Scalars['bigint']['output']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "shop_order_items" */
export type Shop_Order_Items_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 快照，产品封面图，没有规格封面图的时候显示 */
  product_cover_image_url?: InputMaybe<Order_By>;
  /** 快照，产品名称 */
  product_name?: InputMaybe<Order_By>;
  /** 快照，商品sku的图片 */
  product_sku_image_url?: InputMaybe<Order_By>;
  /** 快照，商品sku的名称 */
  product_sku_name?: InputMaybe<Order_By>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Order_By>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 购买数量 */
  quantity?: InputMaybe<Order_By>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "shop_order_items" */
export type Shop_Order_Items_Mutation_Response = {
  __typename?: 'shop_order_items_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Shop_Order_Items>;
};

/** on_conflict condition type for table "shop_order_items" */
export type Shop_Order_Items_On_Conflict = {
  constraint: Shop_Order_Items_Constraint;
  update_columns?: Array<Shop_Order_Items_Update_Column>;
  where?: InputMaybe<Shop_Order_Items_Bool_Exp>;
};

/** Ordering options when selecting data from "shop_order_items". */
export type Shop_Order_Items_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product_cover_image_url?: InputMaybe<Order_By>;
  product_name?: InputMaybe<Order_By>;
  product_sku?: InputMaybe<Product_Skus_Order_By>;
  product_sku_image_url?: InputMaybe<Order_By>;
  product_sku_name?: InputMaybe<Order_By>;
  product_sku_price?: InputMaybe<Order_By>;
  product_sku_product_skus?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  shop_order?: InputMaybe<Shop_Orders_Order_By>;
  shop_order_shop_orders?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: shop_order_items */
export type Shop_Order_Items_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "shop_order_items" */
export enum Shop_Order_Items_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProductCoverImageUrl = 'product_cover_image_url',
  /** column name */
  ProductName = 'product_name',
  /** column name */
  ProductSkuImageUrl = 'product_sku_image_url',
  /** column name */
  ProductSkuName = 'product_sku_name',
  /** column name */
  ProductSkuPrice = 'product_sku_price',
  /** column name */
  ProductSkuProductSkus = 'product_sku_product_skus',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  ShopOrderShopOrders = 'shop_order_shop_orders',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "shop_order_items" */
export type Shop_Order_Items_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 快照，产品封面图，没有规格封面图的时候显示 */
  product_cover_image_url?: InputMaybe<Scalars['String']['input']>;
  /** 快照，产品名称 */
  product_name?: InputMaybe<Scalars['String']['input']>;
  /** 快照，商品sku的图片 */
  product_sku_image_url?: InputMaybe<Scalars['String']['input']>;
  /** 快照，商品sku的名称 */
  product_sku_name?: InputMaybe<Scalars['String']['input']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Scalars['numeric']['input']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Scalars['bigint']['input']>;
  /** 购买数量 */
  quantity?: InputMaybe<Scalars['bigint']['input']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Shop_Order_Items_Stddev_Fields = {
  __typename?: 'shop_order_items_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 购买数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "shop_order_items" */
export type Shop_Order_Items_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Order_By>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 购买数量 */
  quantity?: InputMaybe<Order_By>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Shop_Order_Items_Stddev_Pop_Fields = {
  __typename?: 'shop_order_items_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 购买数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "shop_order_items" */
export type Shop_Order_Items_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Order_By>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 购买数量 */
  quantity?: InputMaybe<Order_By>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Shop_Order_Items_Stddev_Samp_Fields = {
  __typename?: 'shop_order_items_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 购买数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "shop_order_items" */
export type Shop_Order_Items_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Order_By>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 购买数量 */
  quantity?: InputMaybe<Order_By>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "shop_order_items" */
export type Shop_Order_Items_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Shop_Order_Items_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Shop_Order_Items_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 快照，产品封面图，没有规格封面图的时候显示 */
  product_cover_image_url?: InputMaybe<Scalars['String']['input']>;
  /** 快照，产品名称 */
  product_name?: InputMaybe<Scalars['String']['input']>;
  /** 快照，商品sku的图片 */
  product_sku_image_url?: InputMaybe<Scalars['String']['input']>;
  /** 快照，商品sku的名称 */
  product_sku_name?: InputMaybe<Scalars['String']['input']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Scalars['numeric']['input']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Scalars['bigint']['input']>;
  /** 购买数量 */
  quantity?: InputMaybe<Scalars['bigint']['input']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Shop_Order_Items_Sum_Fields = {
  __typename?: 'shop_order_items_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: Maybe<Scalars['numeric']['output']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: Maybe<Scalars['bigint']['output']>;
  /** 购买数量 */
  quantity?: Maybe<Scalars['bigint']['output']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "shop_order_items" */
export type Shop_Order_Items_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Order_By>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 购买数量 */
  quantity?: InputMaybe<Order_By>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Order_By>;
};

/** update columns of table "shop_order_items" */
export enum Shop_Order_Items_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProductCoverImageUrl = 'product_cover_image_url',
  /** column name */
  ProductName = 'product_name',
  /** column name */
  ProductSkuImageUrl = 'product_sku_image_url',
  /** column name */
  ProductSkuName = 'product_sku_name',
  /** column name */
  ProductSkuPrice = 'product_sku_price',
  /** column name */
  ProductSkuProductSkus = 'product_sku_product_skus',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  ShopOrderShopOrders = 'shop_order_shop_orders',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Shop_Order_Items_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Shop_Order_Items_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Shop_Order_Items_Set_Input>;
  /** filter the rows which have to be updated */
  where: Shop_Order_Items_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Shop_Order_Items_Var_Pop_Fields = {
  __typename?: 'shop_order_items_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 购买数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "shop_order_items" */
export type Shop_Order_Items_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Order_By>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 购买数量 */
  quantity?: InputMaybe<Order_By>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Shop_Order_Items_Var_Samp_Fields = {
  __typename?: 'shop_order_items_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 购买数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "shop_order_items" */
export type Shop_Order_Items_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Order_By>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 购买数量 */
  quantity?: InputMaybe<Order_By>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Shop_Order_Items_Variance_Fields = {
  __typename?: 'shop_order_items_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 快照，商品sku的价格 */
  product_sku_price?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: Maybe<Scalars['Float']['output']>;
  /** 购买数量 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "shop_order_items" */
export type Shop_Order_Items_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 快照，商品sku的价格 */
  product_sku_price?: InputMaybe<Order_By>;
  /** 关联外键，哪个商品sku */
  product_sku_product_skus?: InputMaybe<Order_By>;
  /** 购买数量 */
  quantity?: InputMaybe<Order_By>;
  /** 外键，来自哪个店铺订单 */
  shop_order_shop_orders?: InputMaybe<Order_By>;
};

/** 店铺订单表 */
export type Shop_Orders = {
  __typename?: 'shop_orders';
  /** 取消时间(超时未付或商家拒单) */
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 订单完成时间(确认收货或自动完成) */
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 商家确认时间 */
  confirmed_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at: Scalars['timestamptz']['output'];
  /** 送达/签收时间 */
  delivered_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 配送费 */
  delivery_fee: Scalars['numeric']['output'];
  /** 优惠/折扣 */
  discount_amount: Scalars['numeric']['output'];
  id: Scalars['bigint']['output'];
  /** | 场景    | pay_status      | ship_status | refund_status | | ----- | ---------------- | ------------ | -------------- | | 刚下单未付 | `unpaid`         | `pending`    | `NULL`         | | 已付待确认 | `paid`           | `pending`    | `NULL`         | | 商家已接单 | `paid`           | `confirmed`  | `NULL`         | | 备货中   | `paid`           | `processing` | `NULL`         | | 已发货   | `paid`           | `shipped`    | `NULL`         | | 已送达   | `paid`           | `delivered`  | `NULL`         | | 已完成   | `paid`           | `completed`  | `NULL`         | | 申请退款中 | `paid`           | `shipped`    | `refunding`    | | 退款完成  | `fully_refunded` | `completed`  | `refunded`     | | 商家拒单  | `paid`           | `cancelled`  | `refunding`    | | 超时取消  | `unpaid`         | `cancelled`  | `NULL`         | */
  order_status?: Maybe<Scalars['String']['output']>;
  /** 用户支付时间 */
  paid_at?: Maybe<Scalars['timestamptz']['output']>;
  /** | 状态值              | 含义   | 触发条件      | | ---------------- | ---- | --------- | | `unpaid`         | 待支付  | 订单创建，等待付款 | | `paid`           | 已支付  | 支付成功      | | `part_refunded`  | 部分退款 | 部分商品退款完成  | | `fully_refunded` | 全额退款 | 整单退款完成    | */
  pay_status: Scalars['String']['output'];
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: Maybe<Scalars['numeric']['output']>;
  /** 用户确认收货时间（用户点击确认） */
  received_at?: Maybe<Scalars['timestamptz']['output']>;
  /** | 状态值         | 含义  | 触发条件     | | ----------- | --- | -------- | | `NULL`      | 无售后 | 正常订单     | | `refunding` | 退款中 | 用户申请退款   | | `refunded`  | 已退款 | 退款完成     | | `rejected`  | 已拒绝 | 商家拒绝退款申请 | */
  refund_status?: Maybe<Scalars['String']['output']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount: Scalars['numeric']['output'];
  /** 给店铺结算的时间 */
  settled_at?: Maybe<Scalars['timestamptz']['output']>;
  /** | 状态值          | 含义  | 触发方        | | ------------ | --- | ---------- | | `pending`    | 待处理 | 支付完成，等商家确认 | | `confirmed`  | 已确认 | 商家接单       | | `processing` | 备货中 | 确认后准备商品    | | `shipped`    | 已发货 | 填物流单号发货    | | `delivered`  | 已送达 | 物流签收       | | `completed`  | 已完成 | 用户确认收货     | */
  ship_status: Scalars['String']['output'];
  /** 商家发货时间 */
  shipped_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  shop: Shops;
  /** An array relationship */
  shop_order_items: Array<Shop_Order_Items>;
  /** An aggregate relationship */
  shop_order_items_aggregate: Shop_Order_Items_Aggregate;
  /** 关联外键，哪个店铺的订单 */
  shop_shops: Scalars['bigint']['output'];
  /** An object relationship */
  shop_userorder: Shop_Userorders;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders: Scalars['bigint']['output'];
  updated_at: Scalars['timestamptz']['output'];
};


/** 店铺订单表 */
export type Shop_OrdersShop_Order_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Shop_Order_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Order_Items_Order_By>>;
  where?: InputMaybe<Shop_Order_Items_Bool_Exp>;
};


/** 店铺订单表 */
export type Shop_OrdersShop_Order_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Order_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Order_Items_Order_By>>;
  where?: InputMaybe<Shop_Order_Items_Bool_Exp>;
};

/** aggregated selection of "shop_orders" */
export type Shop_Orders_Aggregate = {
  __typename?: 'shop_orders_aggregate';
  aggregate?: Maybe<Shop_Orders_Aggregate_Fields>;
  nodes: Array<Shop_Orders>;
};

export type Shop_Orders_Aggregate_Bool_Exp = {
  count?: InputMaybe<Shop_Orders_Aggregate_Bool_Exp_Count>;
};

export type Shop_Orders_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Shop_Orders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Shop_Orders_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "shop_orders" */
export type Shop_Orders_Aggregate_Fields = {
  __typename?: 'shop_orders_aggregate_fields';
  avg?: Maybe<Shop_Orders_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Shop_Orders_Max_Fields>;
  min?: Maybe<Shop_Orders_Min_Fields>;
  stddev?: Maybe<Shop_Orders_Stddev_Fields>;
  stddev_pop?: Maybe<Shop_Orders_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Shop_Orders_Stddev_Samp_Fields>;
  sum?: Maybe<Shop_Orders_Sum_Fields>;
  var_pop?: Maybe<Shop_Orders_Var_Pop_Fields>;
  var_samp?: Maybe<Shop_Orders_Var_Samp_Fields>;
  variance?: Maybe<Shop_Orders_Variance_Fields>;
};


/** aggregate fields of "shop_orders" */
export type Shop_Orders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Shop_Orders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "shop_orders" */
export type Shop_Orders_Aggregate_Order_By = {
  avg?: InputMaybe<Shop_Orders_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Shop_Orders_Max_Order_By>;
  min?: InputMaybe<Shop_Orders_Min_Order_By>;
  stddev?: InputMaybe<Shop_Orders_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Shop_Orders_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Shop_Orders_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Shop_Orders_Sum_Order_By>;
  var_pop?: InputMaybe<Shop_Orders_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Shop_Orders_Var_Samp_Order_By>;
  variance?: InputMaybe<Shop_Orders_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "shop_orders" */
export type Shop_Orders_Arr_Rel_Insert_Input = {
  data: Array<Shop_Orders_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Shop_Orders_On_Conflict>;
};

/** aggregate avg on columns */
export type Shop_Orders_Avg_Fields = {
  __typename?: 'shop_orders_avg_fields';
  /** 配送费 */
  delivery_fee?: Maybe<Scalars['Float']['output']>;
  /** 优惠/折扣 */
  discount_amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: Maybe<Scalars['Float']['output']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "shop_orders" */
export type Shop_Orders_Avg_Order_By = {
  /** 配送费 */
  delivery_fee?: InputMaybe<Order_By>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Order_By>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Order_By>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "shop_orders". All fields are combined with a logical 'AND'. */
export type Shop_Orders_Bool_Exp = {
  _and?: InputMaybe<Array<Shop_Orders_Bool_Exp>>;
  _not?: InputMaybe<Shop_Orders_Bool_Exp>;
  _or?: InputMaybe<Array<Shop_Orders_Bool_Exp>>;
  cancelled_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  confirmed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  delivered_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  delivery_fee?: InputMaybe<Numeric_Comparison_Exp>;
  discount_amount?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  order_status?: InputMaybe<String_Comparison_Exp>;
  paid_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  pay_status?: InputMaybe<String_Comparison_Exp>;
  product_amount?: InputMaybe<Numeric_Comparison_Exp>;
  received_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  refund_status?: InputMaybe<String_Comparison_Exp>;
  settle_amount?: InputMaybe<Numeric_Comparison_Exp>;
  settled_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  ship_status?: InputMaybe<String_Comparison_Exp>;
  shipped_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  shop?: InputMaybe<Shops_Bool_Exp>;
  shop_order_items?: InputMaybe<Shop_Order_Items_Bool_Exp>;
  shop_order_items_aggregate?: InputMaybe<Shop_Order_Items_Aggregate_Bool_Exp>;
  shop_shops?: InputMaybe<Bigint_Comparison_Exp>;
  shop_userorder?: InputMaybe<Shop_Userorders_Bool_Exp>;
  shop_userorder_shop_userorders?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "shop_orders" */
export enum Shop_Orders_Constraint {
  /** unique or primary key constraint on columns "id" */
  ShopOrdersPkey = 'shop_orders_pkey'
}

/** input type for incrementing numeric columns in table "shop_orders" */
export type Shop_Orders_Inc_Input = {
  /** 配送费 */
  delivery_fee?: InputMaybe<Scalars['numeric']['input']>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Scalars['numeric']['input']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Scalars['numeric']['input']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "shop_orders" */
export type Shop_Orders_Insert_Input = {
  /** 取消时间(超时未付或商家拒单) */
  cancelled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 订单完成时间(确认收货或自动完成) */
  completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 商家确认时间 */
  confirmed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 送达/签收时间 */
  delivered_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 配送费 */
  delivery_fee?: InputMaybe<Scalars['numeric']['input']>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** | 场景    | pay_status      | ship_status | refund_status | | ----- | ---------------- | ------------ | -------------- | | 刚下单未付 | `unpaid`         | `pending`    | `NULL`         | | 已付待确认 | `paid`           | `pending`    | `NULL`         | | 商家已接单 | `paid`           | `confirmed`  | `NULL`         | | 备货中   | `paid`           | `processing` | `NULL`         | | 已发货   | `paid`           | `shipped`    | `NULL`         | | 已送达   | `paid`           | `delivered`  | `NULL`         | | 已完成   | `paid`           | `completed`  | `NULL`         | | 申请退款中 | `paid`           | `shipped`    | `refunding`    | | 退款完成  | `fully_refunded` | `completed`  | `refunded`     | | 商家拒单  | `paid`           | `cancelled`  | `refunding`    | | 超时取消  | `unpaid`         | `cancelled`  | `NULL`         | */
  order_status?: InputMaybe<Scalars['String']['input']>;
  /** 用户支付时间 */
  paid_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** | 状态值              | 含义   | 触发条件      | | ---------------- | ---- | --------- | | `unpaid`         | 待支付  | 订单创建，等待付款 | | `paid`           | 已支付  | 支付成功      | | `part_refunded`  | 部分退款 | 部分商品退款完成  | | `fully_refunded` | 全额退款 | 整单退款完成    | */
  pay_status?: InputMaybe<Scalars['String']['input']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Scalars['numeric']['input']>;
  /** 用户确认收货时间（用户点击确认） */
  received_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** | 状态值         | 含义  | 触发条件     | | ----------- | --- | -------- | | `NULL`      | 无售后 | 正常订单     | | `refunding` | 退款中 | 用户申请退款   | | `refunded`  | 已退款 | 退款完成     | | `rejected`  | 已拒绝 | 商家拒绝退款申请 | */
  refund_status?: InputMaybe<Scalars['String']['input']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Scalars['numeric']['input']>;
  /** 给店铺结算的时间 */
  settled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** | 状态值          | 含义  | 触发方        | | ------------ | --- | ---------- | | `pending`    | 待处理 | 支付完成，等商家确认 | | `confirmed`  | 已确认 | 商家接单       | | `processing` | 备货中 | 确认后准备商品    | | `shipped`    | 已发货 | 填物流单号发货    | | `delivered`  | 已送达 | 物流签收       | | `completed`  | 已完成 | 用户确认收货     | */
  ship_status?: InputMaybe<Scalars['String']['input']>;
  /** 商家发货时间 */
  shipped_at?: InputMaybe<Scalars['timestamptz']['input']>;
  shop?: InputMaybe<Shops_Obj_Rel_Insert_Input>;
  shop_order_items?: InputMaybe<Shop_Order_Items_Arr_Rel_Insert_Input>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  shop_userorder?: InputMaybe<Shop_Userorders_Obj_Rel_Insert_Input>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Shop_Orders_Max_Fields = {
  __typename?: 'shop_orders_max_fields';
  /** 取消时间(超时未付或商家拒单) */
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 订单完成时间(确认收货或自动完成) */
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 商家确认时间 */
  confirmed_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 送达/签收时间 */
  delivered_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 配送费 */
  delivery_fee?: Maybe<Scalars['numeric']['output']>;
  /** 优惠/折扣 */
  discount_amount?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** | 场景    | pay_status      | ship_status | refund_status | | ----- | ---------------- | ------------ | -------------- | | 刚下单未付 | `unpaid`         | `pending`    | `NULL`         | | 已付待确认 | `paid`           | `pending`    | `NULL`         | | 商家已接单 | `paid`           | `confirmed`  | `NULL`         | | 备货中   | `paid`           | `processing` | `NULL`         | | 已发货   | `paid`           | `shipped`    | `NULL`         | | 已送达   | `paid`           | `delivered`  | `NULL`         | | 已完成   | `paid`           | `completed`  | `NULL`         | | 申请退款中 | `paid`           | `shipped`    | `refunding`    | | 退款完成  | `fully_refunded` | `completed`  | `refunded`     | | 商家拒单  | `paid`           | `cancelled`  | `refunding`    | | 超时取消  | `unpaid`         | `cancelled`  | `NULL`         | */
  order_status?: Maybe<Scalars['String']['output']>;
  /** 用户支付时间 */
  paid_at?: Maybe<Scalars['timestamptz']['output']>;
  /** | 状态值              | 含义   | 触发条件      | | ---------------- | ---- | --------- | | `unpaid`         | 待支付  | 订单创建，等待付款 | | `paid`           | 已支付  | 支付成功      | | `part_refunded`  | 部分退款 | 部分商品退款完成  | | `fully_refunded` | 全额退款 | 整单退款完成    | */
  pay_status?: Maybe<Scalars['String']['output']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: Maybe<Scalars['numeric']['output']>;
  /** 用户确认收货时间（用户点击确认） */
  received_at?: Maybe<Scalars['timestamptz']['output']>;
  /** | 状态值         | 含义  | 触发条件     | | ----------- | --- | -------- | | `NULL`      | 无售后 | 正常订单     | | `refunding` | 退款中 | 用户申请退款   | | `refunded`  | 已退款 | 退款完成     | | `rejected`  | 已拒绝 | 商家拒绝退款申请 | */
  refund_status?: Maybe<Scalars['String']['output']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: Maybe<Scalars['numeric']['output']>;
  /** 给店铺结算的时间 */
  settled_at?: Maybe<Scalars['timestamptz']['output']>;
  /** | 状态值          | 含义  | 触发方        | | ------------ | --- | ---------- | | `pending`    | 待处理 | 支付完成，等商家确认 | | `confirmed`  | 已确认 | 商家接单       | | `processing` | 备货中 | 确认后准备商品    | | `shipped`    | 已发货 | 填物流单号发货    | | `delivered`  | 已送达 | 物流签收       | | `completed`  | 已完成 | 用户确认收货     | */
  ship_status?: Maybe<Scalars['String']['output']>;
  /** 商家发货时间 */
  shipped_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "shop_orders" */
export type Shop_Orders_Max_Order_By = {
  /** 取消时间(超时未付或商家拒单) */
  cancelled_at?: InputMaybe<Order_By>;
  /** 订单完成时间(确认收货或自动完成) */
  completed_at?: InputMaybe<Order_By>;
  /** 商家确认时间 */
  confirmed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  /** 送达/签收时间 */
  delivered_at?: InputMaybe<Order_By>;
  /** 配送费 */
  delivery_fee?: InputMaybe<Order_By>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** | 场景    | pay_status      | ship_status | refund_status | | ----- | ---------------- | ------------ | -------------- | | 刚下单未付 | `unpaid`         | `pending`    | `NULL`         | | 已付待确认 | `paid`           | `pending`    | `NULL`         | | 商家已接单 | `paid`           | `confirmed`  | `NULL`         | | 备货中   | `paid`           | `processing` | `NULL`         | | 已发货   | `paid`           | `shipped`    | `NULL`         | | 已送达   | `paid`           | `delivered`  | `NULL`         | | 已完成   | `paid`           | `completed`  | `NULL`         | | 申请退款中 | `paid`           | `shipped`    | `refunding`    | | 退款完成  | `fully_refunded` | `completed`  | `refunded`     | | 商家拒单  | `paid`           | `cancelled`  | `refunding`    | | 超时取消  | `unpaid`         | `cancelled`  | `NULL`         | */
  order_status?: InputMaybe<Order_By>;
  /** 用户支付时间 */
  paid_at?: InputMaybe<Order_By>;
  /** | 状态值              | 含义   | 触发条件      | | ---------------- | ---- | --------- | | `unpaid`         | 待支付  | 订单创建，等待付款 | | `paid`           | 已支付  | 支付成功      | | `part_refunded`  | 部分退款 | 部分商品退款完成  | | `fully_refunded` | 全额退款 | 整单退款完成    | */
  pay_status?: InputMaybe<Order_By>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Order_By>;
  /** 用户确认收货时间（用户点击确认） */
  received_at?: InputMaybe<Order_By>;
  /** | 状态值         | 含义  | 触发条件     | | ----------- | --- | -------- | | `NULL`      | 无售后 | 正常订单     | | `refunding` | 退款中 | 用户申请退款   | | `refunded`  | 已退款 | 退款完成     | | `rejected`  | 已拒绝 | 商家拒绝退款申请 | */
  refund_status?: InputMaybe<Order_By>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Order_By>;
  /** 给店铺结算的时间 */
  settled_at?: InputMaybe<Order_By>;
  /** | 状态值          | 含义  | 触发方        | | ------------ | --- | ---------- | | `pending`    | 待处理 | 支付完成，等商家确认 | | `confirmed`  | 已确认 | 商家接单       | | `processing` | 备货中 | 确认后准备商品    | | `shipped`    | 已发货 | 填物流单号发货    | | `delivered`  | 已送达 | 物流签收       | | `completed`  | 已完成 | 用户确认收货     | */
  ship_status?: InputMaybe<Order_By>;
  /** 商家发货时间 */
  shipped_at?: InputMaybe<Order_By>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Shop_Orders_Min_Fields = {
  __typename?: 'shop_orders_min_fields';
  /** 取消时间(超时未付或商家拒单) */
  cancelled_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 订单完成时间(确认收货或自动完成) */
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 商家确认时间 */
  confirmed_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 送达/签收时间 */
  delivered_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 配送费 */
  delivery_fee?: Maybe<Scalars['numeric']['output']>;
  /** 优惠/折扣 */
  discount_amount?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** | 场景    | pay_status      | ship_status | refund_status | | ----- | ---------------- | ------------ | -------------- | | 刚下单未付 | `unpaid`         | `pending`    | `NULL`         | | 已付待确认 | `paid`           | `pending`    | `NULL`         | | 商家已接单 | `paid`           | `confirmed`  | `NULL`         | | 备货中   | `paid`           | `processing` | `NULL`         | | 已发货   | `paid`           | `shipped`    | `NULL`         | | 已送达   | `paid`           | `delivered`  | `NULL`         | | 已完成   | `paid`           | `completed`  | `NULL`         | | 申请退款中 | `paid`           | `shipped`    | `refunding`    | | 退款完成  | `fully_refunded` | `completed`  | `refunded`     | | 商家拒单  | `paid`           | `cancelled`  | `refunding`    | | 超时取消  | `unpaid`         | `cancelled`  | `NULL`         | */
  order_status?: Maybe<Scalars['String']['output']>;
  /** 用户支付时间 */
  paid_at?: Maybe<Scalars['timestamptz']['output']>;
  /** | 状态值              | 含义   | 触发条件      | | ---------------- | ---- | --------- | | `unpaid`         | 待支付  | 订单创建，等待付款 | | `paid`           | 已支付  | 支付成功      | | `part_refunded`  | 部分退款 | 部分商品退款完成  | | `fully_refunded` | 全额退款 | 整单退款完成    | */
  pay_status?: Maybe<Scalars['String']['output']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: Maybe<Scalars['numeric']['output']>;
  /** 用户确认收货时间（用户点击确认） */
  received_at?: Maybe<Scalars['timestamptz']['output']>;
  /** | 状态值         | 含义  | 触发条件     | | ----------- | --- | -------- | | `NULL`      | 无售后 | 正常订单     | | `refunding` | 退款中 | 用户申请退款   | | `refunded`  | 已退款 | 退款完成     | | `rejected`  | 已拒绝 | 商家拒绝退款申请 | */
  refund_status?: Maybe<Scalars['String']['output']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: Maybe<Scalars['numeric']['output']>;
  /** 给店铺结算的时间 */
  settled_at?: Maybe<Scalars['timestamptz']['output']>;
  /** | 状态值          | 含义  | 触发方        | | ------------ | --- | ---------- | | `pending`    | 待处理 | 支付完成，等商家确认 | | `confirmed`  | 已确认 | 商家接单       | | `processing` | 备货中 | 确认后准备商品    | | `shipped`    | 已发货 | 填物流单号发货    | | `delivered`  | 已送达 | 物流签收       | | `completed`  | 已完成 | 用户确认收货     | */
  ship_status?: Maybe<Scalars['String']['output']>;
  /** 商家发货时间 */
  shipped_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "shop_orders" */
export type Shop_Orders_Min_Order_By = {
  /** 取消时间(超时未付或商家拒单) */
  cancelled_at?: InputMaybe<Order_By>;
  /** 订单完成时间(确认收货或自动完成) */
  completed_at?: InputMaybe<Order_By>;
  /** 商家确认时间 */
  confirmed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  /** 送达/签收时间 */
  delivered_at?: InputMaybe<Order_By>;
  /** 配送费 */
  delivery_fee?: InputMaybe<Order_By>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** | 场景    | pay_status      | ship_status | refund_status | | ----- | ---------------- | ------------ | -------------- | | 刚下单未付 | `unpaid`         | `pending`    | `NULL`         | | 已付待确认 | `paid`           | `pending`    | `NULL`         | | 商家已接单 | `paid`           | `confirmed`  | `NULL`         | | 备货中   | `paid`           | `processing` | `NULL`         | | 已发货   | `paid`           | `shipped`    | `NULL`         | | 已送达   | `paid`           | `delivered`  | `NULL`         | | 已完成   | `paid`           | `completed`  | `NULL`         | | 申请退款中 | `paid`           | `shipped`    | `refunding`    | | 退款完成  | `fully_refunded` | `completed`  | `refunded`     | | 商家拒单  | `paid`           | `cancelled`  | `refunding`    | | 超时取消  | `unpaid`         | `cancelled`  | `NULL`         | */
  order_status?: InputMaybe<Order_By>;
  /** 用户支付时间 */
  paid_at?: InputMaybe<Order_By>;
  /** | 状态值              | 含义   | 触发条件      | | ---------------- | ---- | --------- | | `unpaid`         | 待支付  | 订单创建，等待付款 | | `paid`           | 已支付  | 支付成功      | | `part_refunded`  | 部分退款 | 部分商品退款完成  | | `fully_refunded` | 全额退款 | 整单退款完成    | */
  pay_status?: InputMaybe<Order_By>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Order_By>;
  /** 用户确认收货时间（用户点击确认） */
  received_at?: InputMaybe<Order_By>;
  /** | 状态值         | 含义  | 触发条件     | | ----------- | --- | -------- | | `NULL`      | 无售后 | 正常订单     | | `refunding` | 退款中 | 用户申请退款   | | `refunded`  | 已退款 | 退款完成     | | `rejected`  | 已拒绝 | 商家拒绝退款申请 | */
  refund_status?: InputMaybe<Order_By>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Order_By>;
  /** 给店铺结算的时间 */
  settled_at?: InputMaybe<Order_By>;
  /** | 状态值          | 含义  | 触发方        | | ------------ | --- | ---------- | | `pending`    | 待处理 | 支付完成，等商家确认 | | `confirmed`  | 已确认 | 商家接单       | | `processing` | 备货中 | 确认后准备商品    | | `shipped`    | 已发货 | 填物流单号发货    | | `delivered`  | 已送达 | 物流签收       | | `completed`  | 已完成 | 用户确认收货     | */
  ship_status?: InputMaybe<Order_By>;
  /** 商家发货时间 */
  shipped_at?: InputMaybe<Order_By>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "shop_orders" */
export type Shop_Orders_Mutation_Response = {
  __typename?: 'shop_orders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Shop_Orders>;
};

/** input type for inserting object relation for remote table "shop_orders" */
export type Shop_Orders_Obj_Rel_Insert_Input = {
  data: Shop_Orders_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Shop_Orders_On_Conflict>;
};

/** on_conflict condition type for table "shop_orders" */
export type Shop_Orders_On_Conflict = {
  constraint: Shop_Orders_Constraint;
  update_columns?: Array<Shop_Orders_Update_Column>;
  where?: InputMaybe<Shop_Orders_Bool_Exp>;
};

/** Ordering options when selecting data from "shop_orders". */
export type Shop_Orders_Order_By = {
  cancelled_at?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  confirmed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  delivered_at?: InputMaybe<Order_By>;
  delivery_fee?: InputMaybe<Order_By>;
  discount_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_status?: InputMaybe<Order_By>;
  paid_at?: InputMaybe<Order_By>;
  pay_status?: InputMaybe<Order_By>;
  product_amount?: InputMaybe<Order_By>;
  received_at?: InputMaybe<Order_By>;
  refund_status?: InputMaybe<Order_By>;
  settle_amount?: InputMaybe<Order_By>;
  settled_at?: InputMaybe<Order_By>;
  ship_status?: InputMaybe<Order_By>;
  shipped_at?: InputMaybe<Order_By>;
  shop?: InputMaybe<Shops_Order_By>;
  shop_order_items_aggregate?: InputMaybe<Shop_Order_Items_Aggregate_Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  shop_userorder?: InputMaybe<Shop_Userorders_Order_By>;
  shop_userorder_shop_userorders?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: shop_orders */
export type Shop_Orders_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "shop_orders" */
export enum Shop_Orders_Select_Column {
  /** column name */
  CancelledAt = 'cancelled_at',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  ConfirmedAt = 'confirmed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeliveredAt = 'delivered_at',
  /** column name */
  DeliveryFee = 'delivery_fee',
  /** column name */
  DiscountAmount = 'discount_amount',
  /** column name */
  Id = 'id',
  /** column name */
  OrderStatus = 'order_status',
  /** column name */
  PaidAt = 'paid_at',
  /** column name */
  PayStatus = 'pay_status',
  /** column name */
  ProductAmount = 'product_amount',
  /** column name */
  ReceivedAt = 'received_at',
  /** column name */
  RefundStatus = 'refund_status',
  /** column name */
  SettleAmount = 'settle_amount',
  /** column name */
  SettledAt = 'settled_at',
  /** column name */
  ShipStatus = 'ship_status',
  /** column name */
  ShippedAt = 'shipped_at',
  /** column name */
  ShopShops = 'shop_shops',
  /** column name */
  ShopUserorderShopUserorders = 'shop_userorder_shop_userorders',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "shop_orders" */
export type Shop_Orders_Set_Input = {
  /** 取消时间(超时未付或商家拒单) */
  cancelled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 订单完成时间(确认收货或自动完成) */
  completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 商家确认时间 */
  confirmed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 送达/签收时间 */
  delivered_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 配送费 */
  delivery_fee?: InputMaybe<Scalars['numeric']['input']>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** | 场景    | pay_status      | ship_status | refund_status | | ----- | ---------------- | ------------ | -------------- | | 刚下单未付 | `unpaid`         | `pending`    | `NULL`         | | 已付待确认 | `paid`           | `pending`    | `NULL`         | | 商家已接单 | `paid`           | `confirmed`  | `NULL`         | | 备货中   | `paid`           | `processing` | `NULL`         | | 已发货   | `paid`           | `shipped`    | `NULL`         | | 已送达   | `paid`           | `delivered`  | `NULL`         | | 已完成   | `paid`           | `completed`  | `NULL`         | | 申请退款中 | `paid`           | `shipped`    | `refunding`    | | 退款完成  | `fully_refunded` | `completed`  | `refunded`     | | 商家拒单  | `paid`           | `cancelled`  | `refunding`    | | 超时取消  | `unpaid`         | `cancelled`  | `NULL`         | */
  order_status?: InputMaybe<Scalars['String']['input']>;
  /** 用户支付时间 */
  paid_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** | 状态值              | 含义   | 触发条件      | | ---------------- | ---- | --------- | | `unpaid`         | 待支付  | 订单创建，等待付款 | | `paid`           | 已支付  | 支付成功      | | `part_refunded`  | 部分退款 | 部分商品退款完成  | | `fully_refunded` | 全额退款 | 整单退款完成    | */
  pay_status?: InputMaybe<Scalars['String']['input']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Scalars['numeric']['input']>;
  /** 用户确认收货时间（用户点击确认） */
  received_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** | 状态值         | 含义  | 触发条件     | | ----------- | --- | -------- | | `NULL`      | 无售后 | 正常订单     | | `refunding` | 退款中 | 用户申请退款   | | `refunded`  | 已退款 | 退款完成     | | `rejected`  | 已拒绝 | 商家拒绝退款申请 | */
  refund_status?: InputMaybe<Scalars['String']['input']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Scalars['numeric']['input']>;
  /** 给店铺结算的时间 */
  settled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** | 状态值          | 含义  | 触发方        | | ------------ | --- | ---------- | | `pending`    | 待处理 | 支付完成，等商家确认 | | `confirmed`  | 已确认 | 商家接单       | | `processing` | 备货中 | 确认后准备商品    | | `shipped`    | 已发货 | 填物流单号发货    | | `delivered`  | 已送达 | 物流签收       | | `completed`  | 已完成 | 用户确认收货     | */
  ship_status?: InputMaybe<Scalars['String']['input']>;
  /** 商家发货时间 */
  shipped_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Shop_Orders_Stddev_Fields = {
  __typename?: 'shop_orders_stddev_fields';
  /** 配送费 */
  delivery_fee?: Maybe<Scalars['Float']['output']>;
  /** 优惠/折扣 */
  discount_amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: Maybe<Scalars['Float']['output']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "shop_orders" */
export type Shop_Orders_Stddev_Order_By = {
  /** 配送费 */
  delivery_fee?: InputMaybe<Order_By>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Order_By>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Order_By>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Shop_Orders_Stddev_Pop_Fields = {
  __typename?: 'shop_orders_stddev_pop_fields';
  /** 配送费 */
  delivery_fee?: Maybe<Scalars['Float']['output']>;
  /** 优惠/折扣 */
  discount_amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: Maybe<Scalars['Float']['output']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "shop_orders" */
export type Shop_Orders_Stddev_Pop_Order_By = {
  /** 配送费 */
  delivery_fee?: InputMaybe<Order_By>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Order_By>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Order_By>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Shop_Orders_Stddev_Samp_Fields = {
  __typename?: 'shop_orders_stddev_samp_fields';
  /** 配送费 */
  delivery_fee?: Maybe<Scalars['Float']['output']>;
  /** 优惠/折扣 */
  discount_amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: Maybe<Scalars['Float']['output']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "shop_orders" */
export type Shop_Orders_Stddev_Samp_Order_By = {
  /** 配送费 */
  delivery_fee?: InputMaybe<Order_By>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Order_By>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Order_By>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "shop_orders" */
export type Shop_Orders_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Shop_Orders_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Shop_Orders_Stream_Cursor_Value_Input = {
  /** 取消时间(超时未付或商家拒单) */
  cancelled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 订单完成时间(确认收货或自动完成) */
  completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 商家确认时间 */
  confirmed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 送达/签收时间 */
  delivered_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 配送费 */
  delivery_fee?: InputMaybe<Scalars['numeric']['input']>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** | 场景    | pay_status      | ship_status | refund_status | | ----- | ---------------- | ------------ | -------------- | | 刚下单未付 | `unpaid`         | `pending`    | `NULL`         | | 已付待确认 | `paid`           | `pending`    | `NULL`         | | 商家已接单 | `paid`           | `confirmed`  | `NULL`         | | 备货中   | `paid`           | `processing` | `NULL`         | | 已发货   | `paid`           | `shipped`    | `NULL`         | | 已送达   | `paid`           | `delivered`  | `NULL`         | | 已完成   | `paid`           | `completed`  | `NULL`         | | 申请退款中 | `paid`           | `shipped`    | `refunding`    | | 退款完成  | `fully_refunded` | `completed`  | `refunded`     | | 商家拒单  | `paid`           | `cancelled`  | `refunding`    | | 超时取消  | `unpaid`         | `cancelled`  | `NULL`         | */
  order_status?: InputMaybe<Scalars['String']['input']>;
  /** 用户支付时间 */
  paid_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** | 状态值              | 含义   | 触发条件      | | ---------------- | ---- | --------- | | `unpaid`         | 待支付  | 订单创建，等待付款 | | `paid`           | 已支付  | 支付成功      | | `part_refunded`  | 部分退款 | 部分商品退款完成  | | `fully_refunded` | 全额退款 | 整单退款完成    | */
  pay_status?: InputMaybe<Scalars['String']['input']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Scalars['numeric']['input']>;
  /** 用户确认收货时间（用户点击确认） */
  received_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** | 状态值         | 含义  | 触发条件     | | ----------- | --- | -------- | | `NULL`      | 无售后 | 正常订单     | | `refunding` | 退款中 | 用户申请退款   | | `refunded`  | 已退款 | 退款完成     | | `rejected`  | 已拒绝 | 商家拒绝退款申请 | */
  refund_status?: InputMaybe<Scalars['String']['input']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Scalars['numeric']['input']>;
  /** 给店铺结算的时间 */
  settled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** | 状态值          | 含义  | 触发方        | | ------------ | --- | ---------- | | `pending`    | 待处理 | 支付完成，等商家确认 | | `confirmed`  | 已确认 | 商家接单       | | `processing` | 备货中 | 确认后准备商品    | | `shipped`    | 已发货 | 填物流单号发货    | | `delivered`  | 已送达 | 物流签收       | | `completed`  | 已完成 | 用户确认收货     | */
  ship_status?: InputMaybe<Scalars['String']['input']>;
  /** 商家发货时间 */
  shipped_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Shop_Orders_Sum_Fields = {
  __typename?: 'shop_orders_sum_fields';
  /** 配送费 */
  delivery_fee?: Maybe<Scalars['numeric']['output']>;
  /** 优惠/折扣 */
  discount_amount?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: Maybe<Scalars['numeric']['output']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: Maybe<Scalars['numeric']['output']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "shop_orders" */
export type Shop_Orders_Sum_Order_By = {
  /** 配送费 */
  delivery_fee?: InputMaybe<Order_By>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Order_By>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Order_By>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Order_By>;
};

/** update columns of table "shop_orders" */
export enum Shop_Orders_Update_Column {
  /** column name */
  CancelledAt = 'cancelled_at',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  ConfirmedAt = 'confirmed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeliveredAt = 'delivered_at',
  /** column name */
  DeliveryFee = 'delivery_fee',
  /** column name */
  DiscountAmount = 'discount_amount',
  /** column name */
  Id = 'id',
  /** column name */
  OrderStatus = 'order_status',
  /** column name */
  PaidAt = 'paid_at',
  /** column name */
  PayStatus = 'pay_status',
  /** column name */
  ProductAmount = 'product_amount',
  /** column name */
  ReceivedAt = 'received_at',
  /** column name */
  RefundStatus = 'refund_status',
  /** column name */
  SettleAmount = 'settle_amount',
  /** column name */
  SettledAt = 'settled_at',
  /** column name */
  ShipStatus = 'ship_status',
  /** column name */
  ShippedAt = 'shipped_at',
  /** column name */
  ShopShops = 'shop_shops',
  /** column name */
  ShopUserorderShopUserorders = 'shop_userorder_shop_userorders',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Shop_Orders_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Shop_Orders_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Shop_Orders_Set_Input>;
  /** filter the rows which have to be updated */
  where: Shop_Orders_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Shop_Orders_Var_Pop_Fields = {
  __typename?: 'shop_orders_var_pop_fields';
  /** 配送费 */
  delivery_fee?: Maybe<Scalars['Float']['output']>;
  /** 优惠/折扣 */
  discount_amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: Maybe<Scalars['Float']['output']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "shop_orders" */
export type Shop_Orders_Var_Pop_Order_By = {
  /** 配送费 */
  delivery_fee?: InputMaybe<Order_By>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Order_By>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Order_By>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Shop_Orders_Var_Samp_Fields = {
  __typename?: 'shop_orders_var_samp_fields';
  /** 配送费 */
  delivery_fee?: Maybe<Scalars['Float']['output']>;
  /** 优惠/折扣 */
  discount_amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: Maybe<Scalars['Float']['output']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "shop_orders" */
export type Shop_Orders_Var_Samp_Order_By = {
  /** 配送费 */
  delivery_fee?: InputMaybe<Order_By>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Order_By>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Order_By>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Shop_Orders_Variance_Fields = {
  __typename?: 'shop_orders_variance_fields';
  /** 配送费 */
  delivery_fee?: Maybe<Scalars['Float']['output']>;
  /** 优惠/折扣 */
  discount_amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: Maybe<Scalars['Float']['output']>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "shop_orders" */
export type Shop_Orders_Variance_Order_By = {
  /** 配送费 */
  delivery_fee?: InputMaybe<Order_By>;
  /** 优惠/折扣 */
  discount_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 商品总金额=所有的产品 价格*数量 之和 */
  product_amount?: InputMaybe<Order_By>;
  /** 店铺结算金额=商品总金额+配送费-优惠/折扣 */
  settle_amount?: InputMaybe<Order_By>;
  /** 关联外键，哪个店铺的订单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，由哪个用户订单产生的店铺订单 */
  shop_userorder_shop_userorders?: InputMaybe<Order_By>;
};

/** 店铺的用户订单，用户侧看到的 */
export type Shop_Userorders = {
  __typename?: 'shop_userorders';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** 用户支付金额 */
  pay_amount: Scalars['numeric']['output'];
  /** 详细地址 */
  receiver_address?: Maybe<Scalars['String']['output']>;
  /** 收货人姓名 */
  receiver_name?: Maybe<Scalars['String']['output']>;
  /** 收货人电话 */
  receiver_phone?: Maybe<Scalars['String']['output']>;
  /** 用户订单备注 */
  remark?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  shop: Shops;
  /** An array relationship */
  shop_orders: Array<Shop_Orders>;
  /** An aggregate relationship */
  shop_orders_aggregate: Shop_Orders_Aggregate;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops: Scalars['bigint']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  /** 关联外建，哪个用户下的单 */
  user_users: Scalars['bigint']['output'];
};


/** 店铺的用户订单，用户侧看到的 */
export type Shop_UserordersShop_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Shop_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Orders_Order_By>>;
  where?: InputMaybe<Shop_Orders_Bool_Exp>;
};


/** 店铺的用户订单，用户侧看到的 */
export type Shop_UserordersShop_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Orders_Order_By>>;
  where?: InputMaybe<Shop_Orders_Bool_Exp>;
};

/** aggregated selection of "shop_userorders" */
export type Shop_Userorders_Aggregate = {
  __typename?: 'shop_userorders_aggregate';
  aggregate?: Maybe<Shop_Userorders_Aggregate_Fields>;
  nodes: Array<Shop_Userorders>;
};

export type Shop_Userorders_Aggregate_Bool_Exp = {
  count?: InputMaybe<Shop_Userorders_Aggregate_Bool_Exp_Count>;
};

export type Shop_Userorders_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Shop_Userorders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Shop_Userorders_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "shop_userorders" */
export type Shop_Userorders_Aggregate_Fields = {
  __typename?: 'shop_userorders_aggregate_fields';
  avg?: Maybe<Shop_Userorders_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Shop_Userorders_Max_Fields>;
  min?: Maybe<Shop_Userorders_Min_Fields>;
  stddev?: Maybe<Shop_Userorders_Stddev_Fields>;
  stddev_pop?: Maybe<Shop_Userorders_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Shop_Userorders_Stddev_Samp_Fields>;
  sum?: Maybe<Shop_Userorders_Sum_Fields>;
  var_pop?: Maybe<Shop_Userorders_Var_Pop_Fields>;
  var_samp?: Maybe<Shop_Userorders_Var_Samp_Fields>;
  variance?: Maybe<Shop_Userorders_Variance_Fields>;
};


/** aggregate fields of "shop_userorders" */
export type Shop_Userorders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Shop_Userorders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "shop_userorders" */
export type Shop_Userorders_Aggregate_Order_By = {
  avg?: InputMaybe<Shop_Userorders_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Shop_Userorders_Max_Order_By>;
  min?: InputMaybe<Shop_Userorders_Min_Order_By>;
  stddev?: InputMaybe<Shop_Userorders_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Shop_Userorders_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Shop_Userorders_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Shop_Userorders_Sum_Order_By>;
  var_pop?: InputMaybe<Shop_Userorders_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Shop_Userorders_Var_Samp_Order_By>;
  variance?: InputMaybe<Shop_Userorders_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "shop_userorders" */
export type Shop_Userorders_Arr_Rel_Insert_Input = {
  data: Array<Shop_Userorders_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Shop_Userorders_On_Conflict>;
};

/** aggregate avg on columns */
export type Shop_Userorders_Avg_Fields = {
  __typename?: 'shop_userorders_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 用户支付金额 */
  pay_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "shop_userorders" */
export type Shop_Userorders_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Order_By>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "shop_userorders". All fields are combined with a logical 'AND'. */
export type Shop_Userorders_Bool_Exp = {
  _and?: InputMaybe<Array<Shop_Userorders_Bool_Exp>>;
  _not?: InputMaybe<Shop_Userorders_Bool_Exp>;
  _or?: InputMaybe<Array<Shop_Userorders_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  pay_amount?: InputMaybe<Numeric_Comparison_Exp>;
  receiver_address?: InputMaybe<String_Comparison_Exp>;
  receiver_name?: InputMaybe<String_Comparison_Exp>;
  receiver_phone?: InputMaybe<String_Comparison_Exp>;
  remark?: InputMaybe<String_Comparison_Exp>;
  shop?: InputMaybe<Shops_Bool_Exp>;
  shop_orders?: InputMaybe<Shop_Orders_Bool_Exp>;
  shop_orders_aggregate?: InputMaybe<Shop_Orders_Aggregate_Bool_Exp>;
  shop_shops?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_users?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "shop_userorders" */
export enum Shop_Userorders_Constraint {
  /** unique or primary key constraint on columns "id" */
  ShopUserordersPkey = 'shop_userorders_pkey'
}

/** input type for incrementing numeric columns in table "shop_userorders" */
export type Shop_Userorders_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Scalars['numeric']['input']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "shop_userorders" */
export type Shop_Userorders_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Scalars['numeric']['input']>;
  /** 详细地址 */
  receiver_address?: InputMaybe<Scalars['String']['input']>;
  /** 收货人姓名 */
  receiver_name?: InputMaybe<Scalars['String']['input']>;
  /** 收货人电话 */
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  /** 用户订单备注 */
  remark?: InputMaybe<Scalars['String']['input']>;
  shop?: InputMaybe<Shops_Obj_Rel_Insert_Input>;
  shop_orders?: InputMaybe<Shop_Orders_Arr_Rel_Insert_Input>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type Shop_Userorders_Max_Fields = {
  __typename?: 'shop_userorders_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 用户支付金额 */
  pay_amount?: Maybe<Scalars['numeric']['output']>;
  /** 详细地址 */
  receiver_address?: Maybe<Scalars['String']['output']>;
  /** 收货人姓名 */
  receiver_name?: Maybe<Scalars['String']['output']>;
  /** 收货人电话 */
  receiver_phone?: Maybe<Scalars['String']['output']>;
  /** 用户订单备注 */
  remark?: Maybe<Scalars['String']['output']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "shop_userorders" */
export type Shop_Userorders_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Order_By>;
  /** 详细地址 */
  receiver_address?: InputMaybe<Order_By>;
  /** 收货人姓名 */
  receiver_name?: InputMaybe<Order_By>;
  /** 收货人电话 */
  receiver_phone?: InputMaybe<Order_By>;
  /** 用户订单备注 */
  remark?: InputMaybe<Order_By>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Shop_Userorders_Min_Fields = {
  __typename?: 'shop_userorders_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 用户支付金额 */
  pay_amount?: Maybe<Scalars['numeric']['output']>;
  /** 详细地址 */
  receiver_address?: Maybe<Scalars['String']['output']>;
  /** 收货人姓名 */
  receiver_name?: Maybe<Scalars['String']['output']>;
  /** 收货人电话 */
  receiver_phone?: Maybe<Scalars['String']['output']>;
  /** 用户订单备注 */
  remark?: Maybe<Scalars['String']['output']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "shop_userorders" */
export type Shop_Userorders_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Order_By>;
  /** 详细地址 */
  receiver_address?: InputMaybe<Order_By>;
  /** 收货人姓名 */
  receiver_name?: InputMaybe<Order_By>;
  /** 收货人电话 */
  receiver_phone?: InputMaybe<Order_By>;
  /** 用户订单备注 */
  remark?: InputMaybe<Order_By>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "shop_userorders" */
export type Shop_Userorders_Mutation_Response = {
  __typename?: 'shop_userorders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Shop_Userorders>;
};

/** input type for inserting object relation for remote table "shop_userorders" */
export type Shop_Userorders_Obj_Rel_Insert_Input = {
  data: Shop_Userorders_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Shop_Userorders_On_Conflict>;
};

/** on_conflict condition type for table "shop_userorders" */
export type Shop_Userorders_On_Conflict = {
  constraint: Shop_Userorders_Constraint;
  update_columns?: Array<Shop_Userorders_Update_Column>;
  where?: InputMaybe<Shop_Userorders_Bool_Exp>;
};

/** Ordering options when selecting data from "shop_userorders". */
export type Shop_Userorders_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pay_amount?: InputMaybe<Order_By>;
  receiver_address?: InputMaybe<Order_By>;
  receiver_name?: InputMaybe<Order_By>;
  receiver_phone?: InputMaybe<Order_By>;
  remark?: InputMaybe<Order_By>;
  shop?: InputMaybe<Shops_Order_By>;
  shop_orders_aggregate?: InputMaybe<Shop_Orders_Aggregate_Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** primary key columns input for table: shop_userorders */
export type Shop_Userorders_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "shop_userorders" */
export enum Shop_Userorders_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PayAmount = 'pay_amount',
  /** column name */
  ReceiverAddress = 'receiver_address',
  /** column name */
  ReceiverName = 'receiver_name',
  /** column name */
  ReceiverPhone = 'receiver_phone',
  /** column name */
  Remark = 'remark',
  /** column name */
  ShopShops = 'shop_shops',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserUsers = 'user_users'
}

/** input type for updating data in table "shop_userorders" */
export type Shop_Userorders_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Scalars['numeric']['input']>;
  /** 详细地址 */
  receiver_address?: InputMaybe<Scalars['String']['input']>;
  /** 收货人姓名 */
  receiver_name?: InputMaybe<Scalars['String']['input']>;
  /** 收货人电话 */
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  /** 用户订单备注 */
  remark?: InputMaybe<Scalars['String']['input']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type Shop_Userorders_Stddev_Fields = {
  __typename?: 'shop_userorders_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 用户支付金额 */
  pay_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "shop_userorders" */
export type Shop_Userorders_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Order_By>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Shop_Userorders_Stddev_Pop_Fields = {
  __typename?: 'shop_userorders_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 用户支付金额 */
  pay_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "shop_userorders" */
export type Shop_Userorders_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Order_By>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Shop_Userorders_Stddev_Samp_Fields = {
  __typename?: 'shop_userorders_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 用户支付金额 */
  pay_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "shop_userorders" */
export type Shop_Userorders_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Order_By>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "shop_userorders" */
export type Shop_Userorders_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Shop_Userorders_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Shop_Userorders_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Scalars['numeric']['input']>;
  /** 详细地址 */
  receiver_address?: InputMaybe<Scalars['String']['input']>;
  /** 收货人姓名 */
  receiver_name?: InputMaybe<Scalars['String']['input']>;
  /** 收货人电话 */
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  /** 用户订单备注 */
  remark?: InputMaybe<Scalars['String']['input']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Shop_Userorders_Sum_Fields = {
  __typename?: 'shop_userorders_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  /** 用户支付金额 */
  pay_amount?: Maybe<Scalars['numeric']['output']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "shop_userorders" */
export type Shop_Userorders_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Order_By>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Order_By>;
};

/** update columns of table "shop_userorders" */
export enum Shop_Userorders_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PayAmount = 'pay_amount',
  /** column name */
  ReceiverAddress = 'receiver_address',
  /** column name */
  ReceiverName = 'receiver_name',
  /** column name */
  ReceiverPhone = 'receiver_phone',
  /** column name */
  Remark = 'remark',
  /** column name */
  ShopShops = 'shop_shops',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserUsers = 'user_users'
}

export type Shop_Userorders_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Shop_Userorders_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Shop_Userorders_Set_Input>;
  /** filter the rows which have to be updated */
  where: Shop_Userorders_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Shop_Userorders_Var_Pop_Fields = {
  __typename?: 'shop_userorders_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 用户支付金额 */
  pay_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "shop_userorders" */
export type Shop_Userorders_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Order_By>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Shop_Userorders_Var_Samp_Fields = {
  __typename?: 'shop_userorders_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 用户支付金额 */
  pay_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "shop_userorders" */
export type Shop_Userorders_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Order_By>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Shop_Userorders_Variance_Fields = {
  __typename?: 'shop_userorders_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 用户支付金额 */
  pay_amount?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户下的单 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "shop_userorders" */
export type Shop_Userorders_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  /** 用户支付金额 */
  pay_amount?: InputMaybe<Order_By>;
  /** 关联外建，用户在哪个店铺下的单 */
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户下的单 */
  user_users?: InputMaybe<Order_By>;
};

/** 店铺用户表 */
export type Shop_Users = {
  __typename?: 'shop_users';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** 角色：1.admin（管理员） 2.visitor（访问用户） */
  role: Scalars['String']['output'];
  /** An object relationship */
  shop: Shops;
  shop_shops: Scalars['bigint']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  /** 关联外建，哪个用户 */
  user_users: Scalars['bigint']['output'];
};

/** aggregated selection of "shop_users" */
export type Shop_Users_Aggregate = {
  __typename?: 'shop_users_aggregate';
  aggregate?: Maybe<Shop_Users_Aggregate_Fields>;
  nodes: Array<Shop_Users>;
};

export type Shop_Users_Aggregate_Bool_Exp = {
  count?: InputMaybe<Shop_Users_Aggregate_Bool_Exp_Count>;
};

export type Shop_Users_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Shop_Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Shop_Users_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "shop_users" */
export type Shop_Users_Aggregate_Fields = {
  __typename?: 'shop_users_aggregate_fields';
  avg?: Maybe<Shop_Users_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Shop_Users_Max_Fields>;
  min?: Maybe<Shop_Users_Min_Fields>;
  stddev?: Maybe<Shop_Users_Stddev_Fields>;
  stddev_pop?: Maybe<Shop_Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Shop_Users_Stddev_Samp_Fields>;
  sum?: Maybe<Shop_Users_Sum_Fields>;
  var_pop?: Maybe<Shop_Users_Var_Pop_Fields>;
  var_samp?: Maybe<Shop_Users_Var_Samp_Fields>;
  variance?: Maybe<Shop_Users_Variance_Fields>;
};


/** aggregate fields of "shop_users" */
export type Shop_Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Shop_Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "shop_users" */
export type Shop_Users_Aggregate_Order_By = {
  avg?: InputMaybe<Shop_Users_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Shop_Users_Max_Order_By>;
  min?: InputMaybe<Shop_Users_Min_Order_By>;
  stddev?: InputMaybe<Shop_Users_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Shop_Users_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Shop_Users_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Shop_Users_Sum_Order_By>;
  var_pop?: InputMaybe<Shop_Users_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Shop_Users_Var_Samp_Order_By>;
  variance?: InputMaybe<Shop_Users_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "shop_users" */
export type Shop_Users_Arr_Rel_Insert_Input = {
  data: Array<Shop_Users_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Shop_Users_On_Conflict>;
};

/** aggregate avg on columns */
export type Shop_Users_Avg_Fields = {
  __typename?: 'shop_users_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "shop_users" */
export type Shop_Users_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "shop_users". All fields are combined with a logical 'AND'. */
export type Shop_Users_Bool_Exp = {
  _and?: InputMaybe<Array<Shop_Users_Bool_Exp>>;
  _not?: InputMaybe<Shop_Users_Bool_Exp>;
  _or?: InputMaybe<Array<Shop_Users_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  shop?: InputMaybe<Shops_Bool_Exp>;
  shop_shops?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_users?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "shop_users" */
export enum Shop_Users_Constraint {
  /** unique or primary key constraint on columns "id" */
  ShopUsersPkey = 'shop_users_pkey'
}

/** input type for incrementing numeric columns in table "shop_users" */
export type Shop_Users_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "shop_users" */
export type Shop_Users_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 角色：1.admin（管理员） 2.visitor（访问用户） */
  role?: InputMaybe<Scalars['String']['input']>;
  shop?: InputMaybe<Shops_Obj_Rel_Insert_Input>;
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type Shop_Users_Max_Fields = {
  __typename?: 'shop_users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 角色：1.admin（管理员） 2.visitor（访问用户） */
  role?: Maybe<Scalars['String']['output']>;
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 关联外建，哪个用户 */
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "shop_users" */
export type Shop_Users_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 角色：1.admin（管理员） 2.visitor（访问用户） */
  role?: InputMaybe<Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Shop_Users_Min_Fields = {
  __typename?: 'shop_users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 角色：1.admin（管理员） 2.visitor（访问用户） */
  role?: Maybe<Scalars['String']['output']>;
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 关联外建，哪个用户 */
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "shop_users" */
export type Shop_Users_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  /** 角色：1.admin（管理员） 2.visitor（访问用户） */
  role?: InputMaybe<Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "shop_users" */
export type Shop_Users_Mutation_Response = {
  __typename?: 'shop_users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Shop_Users>;
};

/** on_conflict condition type for table "shop_users" */
export type Shop_Users_On_Conflict = {
  constraint: Shop_Users_Constraint;
  update_columns?: Array<Shop_Users_Update_Column>;
  where?: InputMaybe<Shop_Users_Bool_Exp>;
};

/** Ordering options when selecting data from "shop_users". */
export type Shop_Users_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  shop?: InputMaybe<Shops_Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** primary key columns input for table: shop_users */
export type Shop_Users_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "shop_users" */
export enum Shop_Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  ShopShops = 'shop_shops',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserUsers = 'user_users'
}

/** input type for updating data in table "shop_users" */
export type Shop_Users_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 角色：1.admin（管理员） 2.visitor（访问用户） */
  role?: InputMaybe<Scalars['String']['input']>;
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type Shop_Users_Stddev_Fields = {
  __typename?: 'shop_users_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "shop_users" */
export type Shop_Users_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Shop_Users_Stddev_Pop_Fields = {
  __typename?: 'shop_users_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "shop_users" */
export type Shop_Users_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Shop_Users_Stddev_Samp_Fields = {
  __typename?: 'shop_users_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "shop_users" */
export type Shop_Users_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "shop_users" */
export type Shop_Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Shop_Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Shop_Users_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 角色：1.admin（管理员） 2.visitor（访问用户） */
  role?: InputMaybe<Scalars['String']['input']>;
  shop_shops?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Shop_Users_Sum_Fields = {
  __typename?: 'shop_users_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  shop_shops?: Maybe<Scalars['bigint']['output']>;
  /** 关联外建，哪个用户 */
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "shop_users" */
export type Shop_Users_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Order_By>;
};

/** update columns of table "shop_users" */
export enum Shop_Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  ShopShops = 'shop_shops',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserUsers = 'user_users'
}

export type Shop_Users_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Shop_Users_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Shop_Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Shop_Users_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Shop_Users_Var_Pop_Fields = {
  __typename?: 'shop_users_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "shop_users" */
export type Shop_Users_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Shop_Users_Var_Samp_Fields = {
  __typename?: 'shop_users_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "shop_users" */
export type Shop_Users_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Shop_Users_Variance_Fields = {
  __typename?: 'shop_users_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  shop_shops?: Maybe<Scalars['Float']['output']>;
  /** 关联外建，哪个用户 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "shop_users" */
export type Shop_Users_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  shop_shops?: InputMaybe<Order_By>;
  /** 关联外建，哪个用户 */
  user_users?: InputMaybe<Order_By>;
};

/** 店铺表 */
export type Shops = {
  __typename?: 'shops';
  created_at: Scalars['timestamptz']['output'];
  /** 扩展店铺id列表，在当前店铺同时展示这些店铺的所有商品 */
  extend_shop_ids: Scalars['json']['output'];
  /** 店铺中（包括扩展的店铺）隐藏这些特定商品 */
  hidden_product_ids: Scalars['json']['output'];
  id: Scalars['bigint']['output'];
  /** 店铺名称 */
  name: Scalars['String']['output'];
  /** An array relationship */
  products: Array<Products>;
  /** An aggregate relationship */
  products_aggregate: Products_Aggregate;
  /** An array relationship */
  shop_carts: Array<Shop_Carts>;
  /** An aggregate relationship */
  shop_carts_aggregate: Shop_Carts_Aggregate;
  /** An array relationship */
  shop_orders: Array<Shop_Orders>;
  /** An aggregate relationship */
  shop_orders_aggregate: Shop_Orders_Aggregate;
  /** An array relationship */
  shop_userorders: Array<Shop_Userorders>;
  /** An aggregate relationship */
  shop_userorders_aggregate: Shop_Userorders_Aggregate;
  /** An array relationship */
  shop_users: Array<Shop_Users>;
  /** An aggregate relationship */
  shop_users_aggregate: Shop_Users_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
};


/** 店铺表 */
export type ShopsExtend_Shop_IdsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** 店铺表 */
export type ShopsHidden_Product_IdsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** 店铺表 */
export type ShopsProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


/** 店铺表 */
export type ShopsProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


/** 店铺表 */
export type ShopsShop_CartsArgs = {
  distinct_on?: InputMaybe<Array<Shop_Carts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Carts_Order_By>>;
  where?: InputMaybe<Shop_Carts_Bool_Exp>;
};


/** 店铺表 */
export type ShopsShop_Carts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Carts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Carts_Order_By>>;
  where?: InputMaybe<Shop_Carts_Bool_Exp>;
};


/** 店铺表 */
export type ShopsShop_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Shop_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Orders_Order_By>>;
  where?: InputMaybe<Shop_Orders_Bool_Exp>;
};


/** 店铺表 */
export type ShopsShop_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Orders_Order_By>>;
  where?: InputMaybe<Shop_Orders_Bool_Exp>;
};


/** 店铺表 */
export type ShopsShop_UserordersArgs = {
  distinct_on?: InputMaybe<Array<Shop_Userorders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Userorders_Order_By>>;
  where?: InputMaybe<Shop_Userorders_Bool_Exp>;
};


/** 店铺表 */
export type ShopsShop_Userorders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Userorders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Userorders_Order_By>>;
  where?: InputMaybe<Shop_Userorders_Bool_Exp>;
};


/** 店铺表 */
export type ShopsShop_UsersArgs = {
  distinct_on?: InputMaybe<Array<Shop_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Users_Order_By>>;
  where?: InputMaybe<Shop_Users_Bool_Exp>;
};


/** 店铺表 */
export type ShopsShop_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Users_Order_By>>;
  where?: InputMaybe<Shop_Users_Bool_Exp>;
};

/** aggregated selection of "shops" */
export type Shops_Aggregate = {
  __typename?: 'shops_aggregate';
  aggregate?: Maybe<Shops_Aggregate_Fields>;
  nodes: Array<Shops>;
};

/** aggregate fields of "shops" */
export type Shops_Aggregate_Fields = {
  __typename?: 'shops_aggregate_fields';
  avg?: Maybe<Shops_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Shops_Max_Fields>;
  min?: Maybe<Shops_Min_Fields>;
  stddev?: Maybe<Shops_Stddev_Fields>;
  stddev_pop?: Maybe<Shops_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Shops_Stddev_Samp_Fields>;
  sum?: Maybe<Shops_Sum_Fields>;
  var_pop?: Maybe<Shops_Var_Pop_Fields>;
  var_samp?: Maybe<Shops_Var_Samp_Fields>;
  variance?: Maybe<Shops_Variance_Fields>;
};


/** aggregate fields of "shops" */
export type Shops_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Shops_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Shops_Avg_Fields = {
  __typename?: 'shops_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "shops". All fields are combined with a logical 'AND'. */
export type Shops_Bool_Exp = {
  _and?: InputMaybe<Array<Shops_Bool_Exp>>;
  _not?: InputMaybe<Shops_Bool_Exp>;
  _or?: InputMaybe<Array<Shops_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  extend_shop_ids?: InputMaybe<Json_Comparison_Exp>;
  hidden_product_ids?: InputMaybe<Json_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  products?: InputMaybe<Products_Bool_Exp>;
  products_aggregate?: InputMaybe<Products_Aggregate_Bool_Exp>;
  shop_carts?: InputMaybe<Shop_Carts_Bool_Exp>;
  shop_carts_aggregate?: InputMaybe<Shop_Carts_Aggregate_Bool_Exp>;
  shop_orders?: InputMaybe<Shop_Orders_Bool_Exp>;
  shop_orders_aggregate?: InputMaybe<Shop_Orders_Aggregate_Bool_Exp>;
  shop_userorders?: InputMaybe<Shop_Userorders_Bool_Exp>;
  shop_userorders_aggregate?: InputMaybe<Shop_Userorders_Aggregate_Bool_Exp>;
  shop_users?: InputMaybe<Shop_Users_Bool_Exp>;
  shop_users_aggregate?: InputMaybe<Shop_Users_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "shops" */
export enum Shops_Constraint {
  /** unique or primary key constraint on columns "id" */
  ShopsPkey = 'shops_pkey'
}

/** input type for incrementing numeric columns in table "shops" */
export type Shops_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "shops" */
export type Shops_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 扩展店铺id列表，在当前店铺同时展示这些店铺的所有商品 */
  extend_shop_ids?: InputMaybe<Scalars['json']['input']>;
  /** 店铺中（包括扩展的店铺）隐藏这些特定商品 */
  hidden_product_ids?: InputMaybe<Scalars['json']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 店铺名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Products_Arr_Rel_Insert_Input>;
  shop_carts?: InputMaybe<Shop_Carts_Arr_Rel_Insert_Input>;
  shop_orders?: InputMaybe<Shop_Orders_Arr_Rel_Insert_Input>;
  shop_userorders?: InputMaybe<Shop_Userorders_Arr_Rel_Insert_Input>;
  shop_users?: InputMaybe<Shop_Users_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Shops_Max_Fields = {
  __typename?: 'shops_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 店铺名称 */
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Shops_Min_Fields = {
  __typename?: 'shops_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 店铺名称 */
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "shops" */
export type Shops_Mutation_Response = {
  __typename?: 'shops_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Shops>;
};

/** input type for inserting object relation for remote table "shops" */
export type Shops_Obj_Rel_Insert_Input = {
  data: Shops_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Shops_On_Conflict>;
};

/** on_conflict condition type for table "shops" */
export type Shops_On_Conflict = {
  constraint: Shops_Constraint;
  update_columns?: Array<Shops_Update_Column>;
  where?: InputMaybe<Shops_Bool_Exp>;
};

/** Ordering options when selecting data from "shops". */
export type Shops_Order_By = {
  created_at?: InputMaybe<Order_By>;
  extend_shop_ids?: InputMaybe<Order_By>;
  hidden_product_ids?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  products_aggregate?: InputMaybe<Products_Aggregate_Order_By>;
  shop_carts_aggregate?: InputMaybe<Shop_Carts_Aggregate_Order_By>;
  shop_orders_aggregate?: InputMaybe<Shop_Orders_Aggregate_Order_By>;
  shop_userorders_aggregate?: InputMaybe<Shop_Userorders_Aggregate_Order_By>;
  shop_users_aggregate?: InputMaybe<Shop_Users_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: shops */
export type Shops_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "shops" */
export enum Shops_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtendShopIds = 'extend_shop_ids',
  /** column name */
  HiddenProductIds = 'hidden_product_ids',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "shops" */
export type Shops_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 扩展店铺id列表，在当前店铺同时展示这些店铺的所有商品 */
  extend_shop_ids?: InputMaybe<Scalars['json']['input']>;
  /** 店铺中（包括扩展的店铺）隐藏这些特定商品 */
  hidden_product_ids?: InputMaybe<Scalars['json']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 店铺名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Shops_Stddev_Fields = {
  __typename?: 'shops_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Shops_Stddev_Pop_Fields = {
  __typename?: 'shops_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Shops_Stddev_Samp_Fields = {
  __typename?: 'shops_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "shops" */
export type Shops_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Shops_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Shops_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 扩展店铺id列表，在当前店铺同时展示这些店铺的所有商品 */
  extend_shop_ids?: InputMaybe<Scalars['json']['input']>;
  /** 店铺中（包括扩展的店铺）隐藏这些特定商品 */
  hidden_product_ids?: InputMaybe<Scalars['json']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 店铺名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Shops_Sum_Fields = {
  __typename?: 'shops_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "shops" */
export enum Shops_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtendShopIds = 'extend_shop_ids',
  /** column name */
  HiddenProductIds = 'hidden_product_ids',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Shops_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Shops_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Shops_Set_Input>;
  /** filter the rows which have to be updated */
  where: Shops_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Shops_Var_Pop_Fields = {
  __typename?: 'shops_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Shops_Var_Samp_Fields = {
  __typename?: 'shops_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Shops_Variance_Fields = {
  __typename?: 'shops_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "accounts" */
  accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "accounts" */
  accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accounts_by_pk?: Maybe<Accounts>;
  /** fetch data from the table in a streaming manner: "accounts" */
  accounts_stream: Array<Accounts>;
  /** An array relationship */
  building_rooms: Array<Building_Rooms>;
  /** An aggregate relationship */
  building_rooms_aggregate: Building_Rooms_Aggregate;
  /** fetch data from the table: "building_rooms" using primary key columns */
  building_rooms_by_pk?: Maybe<Building_Rooms>;
  /** fetch data from the table in a streaming manner: "building_rooms" */
  building_rooms_stream: Array<Building_Rooms>;
  /** An array relationship */
  buildings: Array<Buildings>;
  /** An aggregate relationship */
  buildings_aggregate: Buildings_Aggregate;
  /** fetch data from the table: "buildings" using primary key columns */
  buildings_by_pk?: Maybe<Buildings>;
  /** fetch data from the table in a streaming manner: "buildings" */
  buildings_stream: Array<Buildings>;
  /** fetch data from the table: "campuses" */
  campuses: Array<Campuses>;
  /** fetch aggregated fields from the table: "campuses" */
  campuses_aggregate: Campuses_Aggregate;
  /** fetch data from the table: "campuses" using primary key columns */
  campuses_by_pk?: Maybe<Campuses>;
  /** fetch data from the table in a streaming manner: "campuses" */
  campuses_stream: Array<Campuses>;
  /** An array relationship */
  product_skus: Array<Product_Skus>;
  /** An aggregate relationship */
  product_skus_aggregate: Product_Skus_Aggregate;
  /** fetch data from the table: "product_skus" using primary key columns */
  product_skus_by_pk?: Maybe<Product_Skus>;
  /** fetch data from the table in a streaming manner: "product_skus" */
  product_skus_stream: Array<Product_Skus>;
  /** An array relationship */
  products: Array<Products>;
  /** An aggregate relationship */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table in a streaming manner: "products" */
  products_stream: Array<Products>;
  /** An array relationship */
  shop_carts: Array<Shop_Carts>;
  /** An aggregate relationship */
  shop_carts_aggregate: Shop_Carts_Aggregate;
  /** fetch data from the table: "shop_carts" using primary key columns */
  shop_carts_by_pk?: Maybe<Shop_Carts>;
  /** fetch data from the table in a streaming manner: "shop_carts" */
  shop_carts_stream: Array<Shop_Carts>;
  /** An array relationship */
  shop_order_items: Array<Shop_Order_Items>;
  /** An aggregate relationship */
  shop_order_items_aggregate: Shop_Order_Items_Aggregate;
  /** fetch data from the table: "shop_order_items" using primary key columns */
  shop_order_items_by_pk?: Maybe<Shop_Order_Items>;
  /** fetch data from the table in a streaming manner: "shop_order_items" */
  shop_order_items_stream: Array<Shop_Order_Items>;
  /** An array relationship */
  shop_orders: Array<Shop_Orders>;
  /** An aggregate relationship */
  shop_orders_aggregate: Shop_Orders_Aggregate;
  /** fetch data from the table: "shop_orders" using primary key columns */
  shop_orders_by_pk?: Maybe<Shop_Orders>;
  /** fetch data from the table in a streaming manner: "shop_orders" */
  shop_orders_stream: Array<Shop_Orders>;
  /** An array relationship */
  shop_userorders: Array<Shop_Userorders>;
  /** An aggregate relationship */
  shop_userorders_aggregate: Shop_Userorders_Aggregate;
  /** fetch data from the table: "shop_userorders" using primary key columns */
  shop_userorders_by_pk?: Maybe<Shop_Userorders>;
  /** fetch data from the table in a streaming manner: "shop_userorders" */
  shop_userorders_stream: Array<Shop_Userorders>;
  /** An array relationship */
  shop_users: Array<Shop_Users>;
  /** An aggregate relationship */
  shop_users_aggregate: Shop_Users_Aggregate;
  /** fetch data from the table: "shop_users" using primary key columns */
  shop_users_by_pk?: Maybe<Shop_Users>;
  /** fetch data from the table in a streaming manner: "shop_users" */
  shop_users_stream: Array<Shop_Users>;
  /** fetch data from the table: "shops" */
  shops: Array<Shops>;
  /** fetch aggregated fields from the table: "shops" */
  shops_aggregate: Shops_Aggregate;
  /** fetch data from the table: "shops" using primary key columns */
  shops_by_pk?: Maybe<Shops>;
  /** fetch data from the table in a streaming manner: "shops" */
  shops_stream: Array<Shops>;
  /** An array relationship */
  user_accounts: Array<User_Accounts>;
  /** An aggregate relationship */
  user_accounts_aggregate: User_Accounts_Aggregate;
  /** fetch data from the table: "user_accounts" using primary key columns */
  user_accounts_by_pk?: Maybe<User_Accounts>;
  /** fetch data from the table in a streaming manner: "user_accounts" */
  user_accounts_stream: Array<User_Accounts>;
  /** fetch data from the table: "user_addresses" */
  user_addresses: Array<User_Addresses>;
  /** fetch aggregated fields from the table: "user_addresses" */
  user_addresses_aggregate: User_Addresses_Aggregate;
  /** fetch data from the table: "user_addresses" using primary key columns */
  user_addresses_by_pk?: Maybe<User_Addresses>;
  /** fetch data from the table in a streaming manner: "user_addresses" */
  user_addresses_stream: Array<User_Addresses>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};


export type Subscription_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootAccounts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Accounts_Stream_Cursor_Input>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootBuilding_RoomsArgs = {
  distinct_on?: InputMaybe<Array<Building_Rooms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Building_Rooms_Order_By>>;
  where?: InputMaybe<Building_Rooms_Bool_Exp>;
};


export type Subscription_RootBuilding_Rooms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Building_Rooms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Building_Rooms_Order_By>>;
  where?: InputMaybe<Building_Rooms_Bool_Exp>;
};


export type Subscription_RootBuilding_Rooms_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootBuilding_Rooms_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Building_Rooms_Stream_Cursor_Input>>;
  where?: InputMaybe<Building_Rooms_Bool_Exp>;
};


export type Subscription_RootBuildingsArgs = {
  distinct_on?: InputMaybe<Array<Buildings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Buildings_Order_By>>;
  where?: InputMaybe<Buildings_Bool_Exp>;
};


export type Subscription_RootBuildings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Buildings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Buildings_Order_By>>;
  where?: InputMaybe<Buildings_Bool_Exp>;
};


export type Subscription_RootBuildings_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootBuildings_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Buildings_Stream_Cursor_Input>>;
  where?: InputMaybe<Buildings_Bool_Exp>;
};


export type Subscription_RootCampusesArgs = {
  distinct_on?: InputMaybe<Array<Campuses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campuses_Order_By>>;
  where?: InputMaybe<Campuses_Bool_Exp>;
};


export type Subscription_RootCampuses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Campuses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campuses_Order_By>>;
  where?: InputMaybe<Campuses_Bool_Exp>;
};


export type Subscription_RootCampuses_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootCampuses_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Campuses_Stream_Cursor_Input>>;
  where?: InputMaybe<Campuses_Bool_Exp>;
};


export type Subscription_RootProduct_SkusArgs = {
  distinct_on?: InputMaybe<Array<Product_Skus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Skus_Order_By>>;
  where?: InputMaybe<Product_Skus_Bool_Exp>;
};


export type Subscription_RootProduct_Skus_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Skus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Skus_Order_By>>;
  where?: InputMaybe<Product_Skus_Bool_Exp>;
};


export type Subscription_RootProduct_Skus_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootProduct_Skus_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Product_Skus_Stream_Cursor_Input>>;
  where?: InputMaybe<Product_Skus_Bool_Exp>;
};


export type Subscription_RootProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootProducts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Products_Stream_Cursor_Input>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootShop_CartsArgs = {
  distinct_on?: InputMaybe<Array<Shop_Carts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Carts_Order_By>>;
  where?: InputMaybe<Shop_Carts_Bool_Exp>;
};


export type Subscription_RootShop_Carts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Carts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Carts_Order_By>>;
  where?: InputMaybe<Shop_Carts_Bool_Exp>;
};


export type Subscription_RootShop_Carts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootShop_Carts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Shop_Carts_Stream_Cursor_Input>>;
  where?: InputMaybe<Shop_Carts_Bool_Exp>;
};


export type Subscription_RootShop_Order_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Shop_Order_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Order_Items_Order_By>>;
  where?: InputMaybe<Shop_Order_Items_Bool_Exp>;
};


export type Subscription_RootShop_Order_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Order_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Order_Items_Order_By>>;
  where?: InputMaybe<Shop_Order_Items_Bool_Exp>;
};


export type Subscription_RootShop_Order_Items_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootShop_Order_Items_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Shop_Order_Items_Stream_Cursor_Input>>;
  where?: InputMaybe<Shop_Order_Items_Bool_Exp>;
};


export type Subscription_RootShop_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Shop_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Orders_Order_By>>;
  where?: InputMaybe<Shop_Orders_Bool_Exp>;
};


export type Subscription_RootShop_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Orders_Order_By>>;
  where?: InputMaybe<Shop_Orders_Bool_Exp>;
};


export type Subscription_RootShop_Orders_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootShop_Orders_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Shop_Orders_Stream_Cursor_Input>>;
  where?: InputMaybe<Shop_Orders_Bool_Exp>;
};


export type Subscription_RootShop_UserordersArgs = {
  distinct_on?: InputMaybe<Array<Shop_Userorders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Userorders_Order_By>>;
  where?: InputMaybe<Shop_Userorders_Bool_Exp>;
};


export type Subscription_RootShop_Userorders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Userorders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Userorders_Order_By>>;
  where?: InputMaybe<Shop_Userorders_Bool_Exp>;
};


export type Subscription_RootShop_Userorders_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootShop_Userorders_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Shop_Userorders_Stream_Cursor_Input>>;
  where?: InputMaybe<Shop_Userorders_Bool_Exp>;
};


export type Subscription_RootShop_UsersArgs = {
  distinct_on?: InputMaybe<Array<Shop_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Users_Order_By>>;
  where?: InputMaybe<Shop_Users_Bool_Exp>;
};


export type Subscription_RootShop_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Users_Order_By>>;
  where?: InputMaybe<Shop_Users_Bool_Exp>;
};


export type Subscription_RootShop_Users_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootShop_Users_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Shop_Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Shop_Users_Bool_Exp>;
};


export type Subscription_RootShopsArgs = {
  distinct_on?: InputMaybe<Array<Shops_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shops_Order_By>>;
  where?: InputMaybe<Shops_Bool_Exp>;
};


export type Subscription_RootShops_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shops_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shops_Order_By>>;
  where?: InputMaybe<Shops_Bool_Exp>;
};


export type Subscription_RootShops_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootShops_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Shops_Stream_Cursor_Input>>;
  where?: InputMaybe<Shops_Bool_Exp>;
};


export type Subscription_RootUser_AccountsArgs = {
  distinct_on?: InputMaybe<Array<User_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Accounts_Order_By>>;
  where?: InputMaybe<User_Accounts_Bool_Exp>;
};


export type Subscription_RootUser_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Accounts_Order_By>>;
  where?: InputMaybe<User_Accounts_Bool_Exp>;
};


export type Subscription_RootUser_Accounts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootUser_Accounts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Accounts_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Accounts_Bool_Exp>;
};


export type Subscription_RootUser_AddressesArgs = {
  distinct_on?: InputMaybe<Array<User_Addresses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Addresses_Order_By>>;
  where?: InputMaybe<User_Addresses_Bool_Exp>;
};


export type Subscription_RootUser_Addresses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Addresses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Addresses_Order_By>>;
  where?: InputMaybe<User_Addresses_Bool_Exp>;
};


export type Subscription_RootUser_Addresses_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootUser_Addresses_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Addresses_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Addresses_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** 用户授权账号表 */
export type User_Accounts = {
  __typename?: 'user_accounts';
  /** An object relationship */
  account: Accounts;
  account_accounts: Scalars['bigint']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  user_users: Scalars['bigint']['output'];
};

/** aggregated selection of "user_accounts" */
export type User_Accounts_Aggregate = {
  __typename?: 'user_accounts_aggregate';
  aggregate?: Maybe<User_Accounts_Aggregate_Fields>;
  nodes: Array<User_Accounts>;
};

export type User_Accounts_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Accounts_Aggregate_Bool_Exp_Count>;
};

export type User_Accounts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Accounts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_accounts" */
export type User_Accounts_Aggregate_Fields = {
  __typename?: 'user_accounts_aggregate_fields';
  avg?: Maybe<User_Accounts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<User_Accounts_Max_Fields>;
  min?: Maybe<User_Accounts_Min_Fields>;
  stddev?: Maybe<User_Accounts_Stddev_Fields>;
  stddev_pop?: Maybe<User_Accounts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Accounts_Stddev_Samp_Fields>;
  sum?: Maybe<User_Accounts_Sum_Fields>;
  var_pop?: Maybe<User_Accounts_Var_Pop_Fields>;
  var_samp?: Maybe<User_Accounts_Var_Samp_Fields>;
  variance?: Maybe<User_Accounts_Variance_Fields>;
};


/** aggregate fields of "user_accounts" */
export type User_Accounts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_accounts" */
export type User_Accounts_Aggregate_Order_By = {
  avg?: InputMaybe<User_Accounts_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Accounts_Max_Order_By>;
  min?: InputMaybe<User_Accounts_Min_Order_By>;
  stddev?: InputMaybe<User_Accounts_Stddev_Order_By>;
  stddev_pop?: InputMaybe<User_Accounts_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<User_Accounts_Stddev_Samp_Order_By>;
  sum?: InputMaybe<User_Accounts_Sum_Order_By>;
  var_pop?: InputMaybe<User_Accounts_Var_Pop_Order_By>;
  var_samp?: InputMaybe<User_Accounts_Var_Samp_Order_By>;
  variance?: InputMaybe<User_Accounts_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_accounts" */
export type User_Accounts_Arr_Rel_Insert_Input = {
  data: Array<User_Accounts_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Accounts_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Accounts_Avg_Fields = {
  __typename?: 'user_accounts_avg_fields';
  account_accounts?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "user_accounts" */
export type User_Accounts_Avg_Order_By = {
  account_accounts?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_accounts". All fields are combined with a logical 'AND'. */
export type User_Accounts_Bool_Exp = {
  _and?: InputMaybe<Array<User_Accounts_Bool_Exp>>;
  _not?: InputMaybe<User_Accounts_Bool_Exp>;
  _or?: InputMaybe<Array<User_Accounts_Bool_Exp>>;
  account?: InputMaybe<Accounts_Bool_Exp>;
  account_accounts?: InputMaybe<Bigint_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_users?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_accounts" */
export enum User_Accounts_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserAccountsPkey = 'user_accounts_pkey',
  /** unique or primary key constraint on columns "user_users", "account_accounts" */
  UserAccountsUserUsersAccountAccountsKey = 'user_accounts_user_users_account_accounts_key'
}

/** input type for incrementing numeric columns in table "user_accounts" */
export type User_Accounts_Inc_Input = {
  account_accounts?: InputMaybe<Scalars['bigint']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "user_accounts" */
export type User_Accounts_Insert_Input = {
  account?: InputMaybe<Accounts_Obj_Rel_Insert_Input>;
  account_accounts?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type User_Accounts_Max_Fields = {
  __typename?: 'user_accounts_max_fields';
  account_accounts?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "user_accounts" */
export type User_Accounts_Max_Order_By = {
  account_accounts?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Accounts_Min_Fields = {
  __typename?: 'user_accounts_min_fields';
  account_accounts?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "user_accounts" */
export type User_Accounts_Min_Order_By = {
  account_accounts?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_accounts" */
export type User_Accounts_Mutation_Response = {
  __typename?: 'user_accounts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Accounts>;
};

/** on_conflict condition type for table "user_accounts" */
export type User_Accounts_On_Conflict = {
  constraint: User_Accounts_Constraint;
  update_columns?: Array<User_Accounts_Update_Column>;
  where?: InputMaybe<User_Accounts_Bool_Exp>;
};

/** Ordering options when selecting data from "user_accounts". */
export type User_Accounts_Order_By = {
  account?: InputMaybe<Accounts_Order_By>;
  account_accounts?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_accounts */
export type User_Accounts_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "user_accounts" */
export enum User_Accounts_Select_Column {
  /** column name */
  AccountAccounts = 'account_accounts',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserUsers = 'user_users'
}

/** input type for updating data in table "user_accounts" */
export type User_Accounts_Set_Input = {
  account_accounts?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type User_Accounts_Stddev_Fields = {
  __typename?: 'user_accounts_stddev_fields';
  account_accounts?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "user_accounts" */
export type User_Accounts_Stddev_Order_By = {
  account_accounts?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Accounts_Stddev_Pop_Fields = {
  __typename?: 'user_accounts_stddev_pop_fields';
  account_accounts?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "user_accounts" */
export type User_Accounts_Stddev_Pop_Order_By = {
  account_accounts?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Accounts_Stddev_Samp_Fields = {
  __typename?: 'user_accounts_stddev_samp_fields';
  account_accounts?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "user_accounts" */
export type User_Accounts_Stddev_Samp_Order_By = {
  account_accounts?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "user_accounts" */
export type User_Accounts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Accounts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Accounts_Stream_Cursor_Value_Input = {
  account_accounts?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type User_Accounts_Sum_Fields = {
  __typename?: 'user_accounts_sum_fields';
  account_accounts?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "user_accounts" */
export type User_Accounts_Sum_Order_By = {
  account_accounts?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** update columns of table "user_accounts" */
export enum User_Accounts_Update_Column {
  /** column name */
  AccountAccounts = 'account_accounts',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserUsers = 'user_users'
}

export type User_Accounts_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Accounts_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Accounts_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Accounts_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Accounts_Var_Pop_Fields = {
  __typename?: 'user_accounts_var_pop_fields';
  account_accounts?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "user_accounts" */
export type User_Accounts_Var_Pop_Order_By = {
  account_accounts?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Accounts_Var_Samp_Fields = {
  __typename?: 'user_accounts_var_samp_fields';
  account_accounts?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "user_accounts" */
export type User_Accounts_Var_Samp_Order_By = {
  account_accounts?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Accounts_Variance_Fields = {
  __typename?: 'user_accounts_variance_fields';
  account_accounts?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "user_accounts" */
export type User_Accounts_Variance_Order_By = {
  account_accounts?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** 用户地址簿 */
export type User_Addresses = {
  __typename?: 'user_addresses';
  /** 校内地址时，关联的搂栋 */
  building_buildings?: Maybe<Scalars['bigint']['output']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: Maybe<Scalars['bigint']['output']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: Maybe<Scalars['bigint']['output']>;
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** 是否默认 */
  is_default: Scalars['Boolean']['output'];
  /** 收货人完整地址 */
  receiver_address: Scalars['String']['output'];
  /** 可不填，收货人-市 */
  receiver_city?: Maybe<Scalars['String']['output']>;
  /** 可不填，收货人-区 */
  receiver_district?: Maybe<Scalars['String']['output']>;
  /** 收货人姓名 */
  receiver_name: Scalars['String']['output'];
  /** 收获人电话 */
  receiver_phone: Scalars['String']['output'];
  /** 可不填，收货人-省 */
  receiver_province?: Maybe<Scalars['String']['output']>;
  /** 1.campus(校内)  2.normal(校外) */
  type: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** 关联外键，哪个用户的地址 */
  user_users: Scalars['bigint']['output'];
};

/** aggregated selection of "user_addresses" */
export type User_Addresses_Aggregate = {
  __typename?: 'user_addresses_aggregate';
  aggregate?: Maybe<User_Addresses_Aggregate_Fields>;
  nodes: Array<User_Addresses>;
};

/** aggregate fields of "user_addresses" */
export type User_Addresses_Aggregate_Fields = {
  __typename?: 'user_addresses_aggregate_fields';
  avg?: Maybe<User_Addresses_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<User_Addresses_Max_Fields>;
  min?: Maybe<User_Addresses_Min_Fields>;
  stddev?: Maybe<User_Addresses_Stddev_Fields>;
  stddev_pop?: Maybe<User_Addresses_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Addresses_Stddev_Samp_Fields>;
  sum?: Maybe<User_Addresses_Sum_Fields>;
  var_pop?: Maybe<User_Addresses_Var_Pop_Fields>;
  var_samp?: Maybe<User_Addresses_Var_Samp_Fields>;
  variance?: Maybe<User_Addresses_Variance_Fields>;
};


/** aggregate fields of "user_addresses" */
export type User_Addresses_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Addresses_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type User_Addresses_Avg_Fields = {
  __typename?: 'user_addresses_avg_fields';
  /** 校内地址时，关联的搂栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "user_addresses". All fields are combined with a logical 'AND'. */
export type User_Addresses_Bool_Exp = {
  _and?: InputMaybe<Array<User_Addresses_Bool_Exp>>;
  _not?: InputMaybe<User_Addresses_Bool_Exp>;
  _or?: InputMaybe<Array<User_Addresses_Bool_Exp>>;
  building_buildings?: InputMaybe<Bigint_Comparison_Exp>;
  building_room_building_rooms?: InputMaybe<Bigint_Comparison_Exp>;
  campus_campuses?: InputMaybe<Bigint_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  is_default?: InputMaybe<Boolean_Comparison_Exp>;
  receiver_address?: InputMaybe<String_Comparison_Exp>;
  receiver_city?: InputMaybe<String_Comparison_Exp>;
  receiver_district?: InputMaybe<String_Comparison_Exp>;
  receiver_name?: InputMaybe<String_Comparison_Exp>;
  receiver_phone?: InputMaybe<String_Comparison_Exp>;
  receiver_province?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_users?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_addresses" */
export enum User_Addresses_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserAddressesPkey = 'user_addresses_pkey'
}

/** input type for incrementing numeric columns in table "user_addresses" */
export type User_Addresses_Inc_Input = {
  /** 校内地址时，关联的搂栋 */
  building_buildings?: InputMaybe<Scalars['bigint']['input']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: InputMaybe<Scalars['bigint']['input']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: InputMaybe<Scalars['bigint']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "user_addresses" */
export type User_Addresses_Insert_Input = {
  /** 校内地址时，关联的搂栋 */
  building_buildings?: InputMaybe<Scalars['bigint']['input']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: InputMaybe<Scalars['bigint']['input']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 是否默认 */
  is_default?: InputMaybe<Scalars['Boolean']['input']>;
  /** 收货人完整地址 */
  receiver_address?: InputMaybe<Scalars['String']['input']>;
  /** 可不填，收货人-市 */
  receiver_city?: InputMaybe<Scalars['String']['input']>;
  /** 可不填，收货人-区 */
  receiver_district?: InputMaybe<Scalars['String']['input']>;
  /** 收货人姓名 */
  receiver_name?: InputMaybe<Scalars['String']['input']>;
  /** 收获人电话 */
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  /** 可不填，收货人-省 */
  receiver_province?: InputMaybe<Scalars['String']['input']>;
  /** 1.campus(校内)  2.normal(校外) */
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type User_Addresses_Max_Fields = {
  __typename?: 'user_addresses_max_fields';
  /** 校内地址时，关联的搂栋 */
  building_buildings?: Maybe<Scalars['bigint']['output']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: Maybe<Scalars['bigint']['output']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 收货人完整地址 */
  receiver_address?: Maybe<Scalars['String']['output']>;
  /** 可不填，收货人-市 */
  receiver_city?: Maybe<Scalars['String']['output']>;
  /** 可不填，收货人-区 */
  receiver_district?: Maybe<Scalars['String']['output']>;
  /** 收货人姓名 */
  receiver_name?: Maybe<Scalars['String']['output']>;
  /** 收获人电话 */
  receiver_phone?: Maybe<Scalars['String']['output']>;
  /** 可不填，收货人-省 */
  receiver_province?: Maybe<Scalars['String']['output']>;
  /** 1.campus(校内)  2.normal(校外) */
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate min on columns */
export type User_Addresses_Min_Fields = {
  __typename?: 'user_addresses_min_fields';
  /** 校内地址时，关联的搂栋 */
  building_buildings?: Maybe<Scalars['bigint']['output']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: Maybe<Scalars['bigint']['output']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 收货人完整地址 */
  receiver_address?: Maybe<Scalars['String']['output']>;
  /** 可不填，收货人-市 */
  receiver_city?: Maybe<Scalars['String']['output']>;
  /** 可不填，收货人-区 */
  receiver_district?: Maybe<Scalars['String']['output']>;
  /** 收货人姓名 */
  receiver_name?: Maybe<Scalars['String']['output']>;
  /** 收获人电话 */
  receiver_phone?: Maybe<Scalars['String']['output']>;
  /** 可不填，收货人-省 */
  receiver_province?: Maybe<Scalars['String']['output']>;
  /** 1.campus(校内)  2.normal(校外) */
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** response of any mutation on the table "user_addresses" */
export type User_Addresses_Mutation_Response = {
  __typename?: 'user_addresses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Addresses>;
};

/** on_conflict condition type for table "user_addresses" */
export type User_Addresses_On_Conflict = {
  constraint: User_Addresses_Constraint;
  update_columns?: Array<User_Addresses_Update_Column>;
  where?: InputMaybe<User_Addresses_Bool_Exp>;
};

/** Ordering options when selecting data from "user_addresses". */
export type User_Addresses_Order_By = {
  building_buildings?: InputMaybe<Order_By>;
  building_room_building_rooms?: InputMaybe<Order_By>;
  campus_campuses?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_default?: InputMaybe<Order_By>;
  receiver_address?: InputMaybe<Order_By>;
  receiver_city?: InputMaybe<Order_By>;
  receiver_district?: InputMaybe<Order_By>;
  receiver_name?: InputMaybe<Order_By>;
  receiver_phone?: InputMaybe<Order_By>;
  receiver_province?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_users?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_addresses */
export type User_Addresses_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "user_addresses" */
export enum User_Addresses_Select_Column {
  /** column name */
  BuildingBuildings = 'building_buildings',
  /** column name */
  BuildingRoomBuildingRooms = 'building_room_building_rooms',
  /** column name */
  CampusCampuses = 'campus_campuses',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsDefault = 'is_default',
  /** column name */
  ReceiverAddress = 'receiver_address',
  /** column name */
  ReceiverCity = 'receiver_city',
  /** column name */
  ReceiverDistrict = 'receiver_district',
  /** column name */
  ReceiverName = 'receiver_name',
  /** column name */
  ReceiverPhone = 'receiver_phone',
  /** column name */
  ReceiverProvince = 'receiver_province',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserUsers = 'user_users'
}

/** input type for updating data in table "user_addresses" */
export type User_Addresses_Set_Input = {
  /** 校内地址时，关联的搂栋 */
  building_buildings?: InputMaybe<Scalars['bigint']['input']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: InputMaybe<Scalars['bigint']['input']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 是否默认 */
  is_default?: InputMaybe<Scalars['Boolean']['input']>;
  /** 收货人完整地址 */
  receiver_address?: InputMaybe<Scalars['String']['input']>;
  /** 可不填，收货人-市 */
  receiver_city?: InputMaybe<Scalars['String']['input']>;
  /** 可不填，收货人-区 */
  receiver_district?: InputMaybe<Scalars['String']['input']>;
  /** 收货人姓名 */
  receiver_name?: InputMaybe<Scalars['String']['input']>;
  /** 收获人电话 */
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  /** 可不填，收货人-省 */
  receiver_province?: InputMaybe<Scalars['String']['input']>;
  /** 1.campus(校内)  2.normal(校外) */
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type User_Addresses_Stddev_Fields = {
  __typename?: 'user_addresses_stddev_fields';
  /** 校内地址时，关联的搂栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type User_Addresses_Stddev_Pop_Fields = {
  __typename?: 'user_addresses_stddev_pop_fields';
  /** 校内地址时，关联的搂栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type User_Addresses_Stddev_Samp_Fields = {
  __typename?: 'user_addresses_stddev_samp_fields';
  /** 校内地址时，关联的搂栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "user_addresses" */
export type User_Addresses_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Addresses_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Addresses_Stream_Cursor_Value_Input = {
  /** 校内地址时，关联的搂栋 */
  building_buildings?: InputMaybe<Scalars['bigint']['input']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: InputMaybe<Scalars['bigint']['input']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 是否默认 */
  is_default?: InputMaybe<Scalars['Boolean']['input']>;
  /** 收货人完整地址 */
  receiver_address?: InputMaybe<Scalars['String']['input']>;
  /** 可不填，收货人-市 */
  receiver_city?: InputMaybe<Scalars['String']['input']>;
  /** 可不填，收货人-区 */
  receiver_district?: InputMaybe<Scalars['String']['input']>;
  /** 收货人姓名 */
  receiver_name?: InputMaybe<Scalars['String']['input']>;
  /** 收获人电话 */
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  /** 可不填，收货人-省 */
  receiver_province?: InputMaybe<Scalars['String']['input']>;
  /** 1.campus(校内)  2.normal(校外) */
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type User_Addresses_Sum_Fields = {
  __typename?: 'user_addresses_sum_fields';
  /** 校内地址时，关联的搂栋 */
  building_buildings?: Maybe<Scalars['bigint']['output']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: Maybe<Scalars['bigint']['output']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "user_addresses" */
export enum User_Addresses_Update_Column {
  /** column name */
  BuildingBuildings = 'building_buildings',
  /** column name */
  BuildingRoomBuildingRooms = 'building_room_building_rooms',
  /** column name */
  CampusCampuses = 'campus_campuses',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsDefault = 'is_default',
  /** column name */
  ReceiverAddress = 'receiver_address',
  /** column name */
  ReceiverCity = 'receiver_city',
  /** column name */
  ReceiverDistrict = 'receiver_district',
  /** column name */
  ReceiverName = 'receiver_name',
  /** column name */
  ReceiverPhone = 'receiver_phone',
  /** column name */
  ReceiverProvince = 'receiver_province',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserUsers = 'user_users'
}

export type User_Addresses_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Addresses_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Addresses_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Addresses_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Addresses_Var_Pop_Fields = {
  __typename?: 'user_addresses_var_pop_fields';
  /** 校内地址时，关联的搂栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type User_Addresses_Var_Samp_Fields = {
  __typename?: 'user_addresses_var_samp_fields';
  /** 校内地址时，关联的搂栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type User_Addresses_Variance_Fields = {
  __typename?: 'user_addresses_variance_fields';
  /** 校内地址时，关联的搂栋 */
  building_buildings?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的楼栋房间 */
  building_room_building_rooms?: Maybe<Scalars['Float']['output']>;
  /** 校内地址时，关联的学校 */
  campus_campuses?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  /** 关联外键，哪个用户的地址 */
  user_users?: Maybe<Scalars['Float']['output']>;
};

/** 用户表 */
export type Users = {
  __typename?: 'users';
  /** 用户头像url */
  avatar_url?: Maybe<Scalars['String']['output']>;
  /** 用户简介，富文本 */
  bio?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamptz']['output'];
  /** 用户邮箱账号 */
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['bigint']['output'];
  /** 手机号 */
  mobile?: Maybe<Scalars['String']['output']>;
  /** 用户昵称 */
  nickname?: Maybe<Scalars['String']['output']>;
  /** 密码，md5 32位小写 */
  password?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  shop_carts: Array<Shop_Carts>;
  /** An aggregate relationship */
  shop_carts_aggregate: Shop_Carts_Aggregate;
  /** An array relationship */
  shop_userorders: Array<Shop_Userorders>;
  /** An aggregate relationship */
  shop_userorders_aggregate: Shop_Userorders_Aggregate;
  /** An array relationship */
  shop_users: Array<Shop_Users>;
  /** An aggregate relationship */
  shop_users_aggregate: Shop_Users_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
  /** An array relationship */
  user_accounts: Array<User_Accounts>;
  /** An aggregate relationship */
  user_accounts_aggregate: User_Accounts_Aggregate;
};


/** 用户表 */
export type UsersShop_CartsArgs = {
  distinct_on?: InputMaybe<Array<Shop_Carts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Carts_Order_By>>;
  where?: InputMaybe<Shop_Carts_Bool_Exp>;
};


/** 用户表 */
export type UsersShop_Carts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Carts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Carts_Order_By>>;
  where?: InputMaybe<Shop_Carts_Bool_Exp>;
};


/** 用户表 */
export type UsersShop_UserordersArgs = {
  distinct_on?: InputMaybe<Array<Shop_Userorders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Userorders_Order_By>>;
  where?: InputMaybe<Shop_Userorders_Bool_Exp>;
};


/** 用户表 */
export type UsersShop_Userorders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Userorders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Userorders_Order_By>>;
  where?: InputMaybe<Shop_Userorders_Bool_Exp>;
};


/** 用户表 */
export type UsersShop_UsersArgs = {
  distinct_on?: InputMaybe<Array<Shop_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Users_Order_By>>;
  where?: InputMaybe<Shop_Users_Bool_Exp>;
};


/** 用户表 */
export type UsersShop_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shop_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Shop_Users_Order_By>>;
  where?: InputMaybe<Shop_Users_Bool_Exp>;
};


/** 用户表 */
export type UsersUser_AccountsArgs = {
  distinct_on?: InputMaybe<Array<User_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Accounts_Order_By>>;
  where?: InputMaybe<User_Accounts_Bool_Exp>;
};


/** 用户表 */
export type UsersUser_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Accounts_Order_By>>;
  where?: InputMaybe<User_Accounts_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  avg?: Maybe<Users_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
  stddev?: Maybe<Users_Stddev_Fields>;
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>;
  sum?: Maybe<Users_Sum_Fields>;
  var_pop?: Maybe<Users_Var_Pop_Fields>;
  var_samp?: Maybe<Users_Var_Samp_Fields>;
  variance?: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  avatar_url?: InputMaybe<String_Comparison_Exp>;
  bio?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  mobile?: InputMaybe<String_Comparison_Exp>;
  nickname?: InputMaybe<String_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  shop_carts?: InputMaybe<Shop_Carts_Bool_Exp>;
  shop_carts_aggregate?: InputMaybe<Shop_Carts_Aggregate_Bool_Exp>;
  shop_userorders?: InputMaybe<Shop_Userorders_Bool_Exp>;
  shop_userorders_aggregate?: InputMaybe<Shop_Userorders_Aggregate_Bool_Exp>;
  shop_users?: InputMaybe<Shop_Users_Bool_Exp>;
  shop_users_aggregate?: InputMaybe<Shop_Users_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_accounts?: InputMaybe<User_Accounts_Bool_Exp>;
  user_accounts_aggregate?: InputMaybe<User_Accounts_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "mobile" */
  UsersMobileKey = 'users_mobile_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** input type for incrementing numeric columns in table "users" */
export type Users_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  /** 用户头像url */
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  /** 用户简介，富文本 */
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 用户邮箱账号 */
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 手机号 */
  mobile?: InputMaybe<Scalars['String']['input']>;
  /** 用户昵称 */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** 密码，md5 32位小写 */
  password?: InputMaybe<Scalars['String']['input']>;
  shop_carts?: InputMaybe<Shop_Carts_Arr_Rel_Insert_Input>;
  shop_userorders?: InputMaybe<Shop_Userorders_Arr_Rel_Insert_Input>;
  shop_users?: InputMaybe<Shop_Users_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_accounts?: InputMaybe<User_Accounts_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  /** 用户头像url */
  avatar_url?: Maybe<Scalars['String']['output']>;
  /** 用户简介，富文本 */
  bio?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 用户邮箱账号 */
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 手机号 */
  mobile?: Maybe<Scalars['String']['output']>;
  /** 用户昵称 */
  nickname?: Maybe<Scalars['String']['output']>;
  /** 密码，md5 32位小写 */
  password?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  /** 用户头像url */
  avatar_url?: Maybe<Scalars['String']['output']>;
  /** 用户简介，富文本 */
  bio?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 用户邮箱账号 */
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** 手机号 */
  mobile?: Maybe<Scalars['String']['output']>;
  /** 用户昵称 */
  nickname?: Maybe<Scalars['String']['output']>;
  /** 密码，md5 32位小写 */
  password?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  avatar_url?: InputMaybe<Order_By>;
  bio?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mobile?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  shop_carts_aggregate?: InputMaybe<Shop_Carts_Aggregate_Order_By>;
  shop_userorders_aggregate?: InputMaybe<Shop_Userorders_Aggregate_Order_By>;
  shop_users_aggregate?: InputMaybe<Shop_Users_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_accounts_aggregate?: InputMaybe<User_Accounts_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  AvatarUrl = 'avatar_url',
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Mobile = 'mobile',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Password = 'password',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  /** 用户头像url */
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  /** 用户简介，富文本 */
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 用户邮箱账号 */
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 手机号 */
  mobile?: InputMaybe<Scalars['String']['input']>;
  /** 用户昵称 */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** 密码，md5 32位小写 */
  password?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  /** 用户头像url */
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  /** 用户简介，富文本 */
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 用户邮箱账号 */
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  /** 手机号 */
  mobile?: InputMaybe<Scalars['String']['input']>;
  /** 用户昵称 */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** 密码，md5 32位小写 */
  password?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  AvatarUrl = 'avatar_url',
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Mobile = 'mobile',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Password = 'password',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Users_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Users_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};
