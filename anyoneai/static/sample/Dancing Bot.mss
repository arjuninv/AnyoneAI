<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="controls_repeat_ext" id="1S4%O)_oaz?!?h[u5X/H" x="70" y="50">
    <value name="TIMES">
      <shadow type="math_number" id="s)_4BE*GG?Rn.l~@oXM5">
        <field name="NUM">10</field>
      </shadow>
    </value>
    <statement name="DO">
      <block type="delay" id="wvD~PxjM{5jnKS*gb_nf">
        <value name="seconds">
          <block type="math_number" id="(:hH6x_GeEviWn.`*KZH">
            <field name="NUM">1</field>
          </block>
        </value>
        <next>
          <block type="led" id="QYO)C}ttV}X(*xC#Zd@t">
            <field name="port">0</field>
            <value name="isOn">
              <block type="logic_boolean" id="}@,D:cT{l[sp8/)nVx(R">
                <field name="BOOL">TRUE</field>
              </block>
            </value>
            <next>
              <block type="delay" id="nup~okH5,3vQwt$kA8Rw">
                <value name="seconds">
                  <block type="math_number" id="OYt4SAt@#[]+ms_pe)v{">
                    <field name="NUM">1</field>
                  </block>
                </value>
                <next>
                  <block type="led" id="E`c!oFBM:bFLLUA=q|M8">
                    <field name="port">0</field>
                    <value name="isOn">
                      <block type="logic_boolean" id="25}*Ao21g[Gp;Vr7v/ch">
                        <field name="BOOL">FALSE</field>
                      </block>
                    </value>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>