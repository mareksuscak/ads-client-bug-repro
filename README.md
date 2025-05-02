# ads-client bug reproduction

DUTs:

```
TYPE ST_1 :
STRUCT
 AuthKey: STRING;
 Cmd: STRING;
 RequestingBayNumber: INT;
END_STRUCT
END_TYPE
```

```
TYPE ST_2 :
STRUCT
 Props1: STRING;
 Prop2: STRING;
 Prop3: INT;
END_STRUCT
END_TYPE
```

```
TYPE ST_3 :
STRUCT
 Prop1: BYTE;
 Prop2: WORD;
 Prop3: STRING(20);
 Prop4 : BYTE;
   Prop5 : BYTE;
END_STRUCT
END_TYPE
```


GVL_Remote:

```
{attribute 'qualified_only'}
VAR_GLOBAL
 Var01 : BOOL;
 Var02 : BOOL;
 Var03 : BOOL;
 Var04 : BOOL;
 Var05 : BOOL;
 Var06 : BOOL;
 Var07 : BOOL;
 Var08 : BOOL;
 Var09 : BOOL;
 Var10 : BOOL;

 Var11 : BOOL := TRUE;
 Var12 : BOOL := TRUE;
 Var13 : BOOL;
 Var14 : BOOL := TRUE;
 Var15 : BOOL := TRUE;
 Var16 : BOOL;
 Var17 : BOOL;

 Var39 : STRING(80);
 Var40 : STRING(80);
 Var41 : STRING(80);
 Var42 : STRING(80);
 Var43 : STRING(80);
 Var44 : STRING(80);
 Var45 : STRING(80);
 Var46 : BOOL;

 Var20 : BOOL := TRUE;
 Var21 : BOOL := TRUE;
 Var22 : BOOL;
 Var23 : BOOL;
 Var24 : BOOL;
 Var25 : BOOL;
 Var26 : BOOL;
 Var27 : BOOL;
 Var28 : BOOL := TRUE;
 Var29 : BOOL;
 Var30 : BOOL;

 Var31 : ARRAY [0..293] OF BOOL;

 Var32 : BYTE;
 Var33 : BYTE;
 Var34 : BOOL;
 Var35 : BOOL;
 Var36 : BOOL;

 Var37: ST_1;
 Var38: ST_2;

 Var19 : ARRAY [0..85] OF BYTE := [
  255,
   1,
   2,
   3,
   4,
   5,
   6,
   7,
   8,
   9,
   10,
   11,
   12,
   13,
   14,
   15,
   16,
   17,
   18,
   19,
   20,
   21,
   22,
   23,
   24,
   25,
   26,
   27,
   28,
   29,
   30,
   31,
   32,
   33,
   34,
   35,
   36,
   37,
   38,
   39,
   40,
   41,
   42,
   43,
   44,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   255,
   255,
   0,
   0
 ];

 Var18: ARRAY[1..80] OF ST_3 := [
  (Prop1 := 0, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 1, Prop2 := 1, Prop3 := '2002074531', Prop4 := 0, Prop5 := 1),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 1, Prop2 := 1, Prop3 := '2002294295', Prop4 := 0, Prop5 := 1),
  (Prop1 := 1, Prop2 := 1, Prop3 := '2002401360', Prop4 := 0, Prop5 := 1),
  (Prop1 := 1, Prop2 := 1, Prop3 := '2002462068', Prop4 := 0, Prop5 := 1),
  (Prop1 := 1, Prop2 := 1, Prop3 := '2002541941', Prop4 := 0, Prop5 := 1),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 1, Prop2 := 1, Prop3 := '2002558158', Prop4 := 0, Prop5 := 1),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 1, Prop2 := 1, Prop3 := '2002585832', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 1, Prop2 := 1, Prop3 := '2002593020', Prop4 := 0, Prop5 := 1),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 1, Prop2 := 2, Prop3 := '2002601417', Prop4 := 0, Prop5 := 1),
  (Prop1 := 1, Prop2 := 1, Prop3 := '20026170177', Prop4 := 0, Prop5 := 1),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4),
  (Prop1 := 1, Prop2 := 1, Prop3 := 'CA1520977', Prop4 := 1, Prop5 := 1),
  (Prop1 := 1, Prop2 := 1, Prop3 := '2002665335', Prop4 := 2, Prop5 := 1),
  (Prop1 := 2, Prop2 := 0, Prop3 := '', Prop4 := 0, Prop5 := 4)
    ];

END_VAR
```
