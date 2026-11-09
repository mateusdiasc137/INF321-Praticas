defmodule KitchenCalculator do
  @cup 240.0
  @fluid_ounce 30.0
  @teaspoon 5.0
  @tablespoon 15.0

  def get_volume(volume_pair) do
    {_, numeric_value} = volume_pair
    numeric_value
  end

  def to_milliliter(volume_pair) do
    calc_to_milliter(volume_pair)
  end

  def from_milliliter(volume_pair, unit) do
    calc_from_milliter(volume_pair, unit)
  end

  def convert(volume_pair, unit) do
    to_milliliter(volume_pair) |> from_milliliter(unit)
  end

  defp calc_to_milliter({:cup, value}), do: {:milliliter, @cup * value}
  defp calc_to_milliter({:fluid_ounce, value}), do: {:milliliter, @fluid_ounce * value}
  defp calc_to_milliter({:teaspoon, value}), do: {:milliliter, @teaspoon * value}
  defp calc_to_milliter({:tablespoon, value}), do: {:milliliter, @tablespoon * value}
  defp calc_to_milliter({:milliliter, value}), do: {:milliliter, value}
  defp calc_to_milliter(_), do: {:error, "Should not be here!"}

  defp calc_from_milliter(volume_pair, :cup), do: {:cup, get_volume(volume_pair) / @cup}

  defp calc_from_milliter(volume_pair, :fluid_ounce),
    do: {:fluid_ounce, get_volume(volume_pair) / @fluid_ounce}

  defp calc_from_milliter(volume_pair, :teaspoon),
    do: {:teaspoon, get_volume(volume_pair) / @teaspoon}

  defp calc_from_milliter(volume_pair, :tablespoon),
    do: {:tablespoon, get_volume(volume_pair) / @tablespoon}

  defp calc_from_milliter(volume_pair, :milliliter), do: {:milliliter, get_volume(volume_pair)}
  defp calc_from_milliter(_, _), do: {:error, "Should not be here!"}
end
