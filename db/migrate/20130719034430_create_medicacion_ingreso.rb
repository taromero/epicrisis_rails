class CreateMedicacionIngreso < ActiveRecord::Migration
  def change
    create_table :medicacion_ingreso do |t|
      t.boolean :espironolactona
      t.boolean :furosemida
      t.boolean :propranolol
      t.boolean :antibiotico_profilactico

      t.integer :epicrisis_id
      
      t.timestamps
    end
  end
end
